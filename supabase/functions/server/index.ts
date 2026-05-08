import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js";
import * as kv from "./kv_store.ts";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization", "apikey"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Helper to get Supabase Client
const getSupabase = (c: any) => {
  const authHeader = c.req.header("Authorization");
  return createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    { global: { headers: { Authorization: authHeader ?? "" } } }
  );
};

// --- ROUTES ---

// Health check
app.get("/health", (c) => c.json({ status: "ok" }));
app.get("/make-server-fd19e96d/health", (c) => c.json({ status: "ok" }));
app.get("/make-server-af0ac0fa/health", (c) => c.json({ status: "ok" }));

// Stats
const getStatsHandler = async (c: any) => {
  try {
    const signups = await kv.getByPrefix("signup:");
    const count = signups.length;
    const remaining = Math.max(0, 100 - count);
    const recent = signups
      .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3)
      .map((s: any) => ({
        name: s.name || "Guerrero Anónimo",
        city: "del Gimnasio",
        min: Math.max(1, Math.floor((new Date().getTime() - new Date(s.date).getTime()) / 60000))
      }));

    return c.json({ count, remaining, recent });
  } catch (error) {
    return c.json({ count: 0, remaining: 100, recent: [] });
  }
};

app.get("/stats", getStatsHandler);
app.get("/make-server-fd19e96d/stats", getStatsHandler);

// Nutrition: Get Daily Log
const getNutritionDailyHandler = async (c: any) => {
  const date = c.req.param("date");
  const supabase = getSupabase(c);

  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) return c.json({ error: "Unauthorized" }, 401);

  try {
    // 1. Get Meals
    const { data: meals, error: mealsError } = await supabase
      .from("meals")
      .select("*")
      .eq("user_id", user.id)
      .eq("date", date);

    if (mealsError) throw mealsError;

    // 2. Get Daily Summary/Water
    const { data: logs, error: logError } = await supabase
      .from("nutrition_logs")
      .select("*")
      .eq("user_id", user.id)
      .eq("log_date", date)
      .limit(1);

    if (logError) {
      console.error("Log Error:", logError);
      // Don't throw, just assume water is 0
    }

    const log = logs && logs.length > 0 ? logs[0] : null;
    const water = log?.water_ml || 0;

    // Calculate totals from meals
    const totals = meals?.reduce((acc: any, m: any) => ({
      calories: acc.calories + (Number(m.calories) || 0),
      protein: acc.protein + (Number(m.protein) || 0),
      carbs: acc.carbs + (Number(m.carbs) || 0),
      fats: acc.fats + (Number(m.fats) || 0),
    }), { calories: 0, protein: 0, carbs: 0, fats: 0 }) || { calories: 0, protein: 0, carbs: 0, fats: 0 };

    return c.json({
      meals: meals || [],
      water,
      totals
    });
  } catch (error) {
    console.error("Nutrition Error:", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
};

app.get("/nutrition/daily/:date", getNutritionDailyHandler);
app.get("/make-server-af0ac0fa/nutrition/daily/:date", getNutritionDailyHandler);

// Nutrition: Save Meal
const saveMealHandler = async (c: any) => {
  const supabase = getSupabase(c);
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) return c.json({ error: "Unauthorized" }, 401);

  try {
    const { date, mealId, items } = await c.req.json();

    if (!items || !Array.isArray(items)) {
      return c.json({ error: "Invalid items" }, 400);
    }

    const mealRows = items.map((item: any) => ({
      user_id: user.id,
      date,
      meal_type: mealId,
      food_id: item.id || `food-${Date.now()}`,
      name: item.name,
      quantity: item.count || 1,
      calories: (item.calories || 0) * (item.count || 1),
      protein: (item.protein || 0) * (item.count || 1),
      carbs: (item.carbs || 0) * (item.count || 1),
      fats: (item.fats || 0) * (item.count || 1),
      created_at: new Date().toISOString()
    }));

    const { error } = await supabase
      .from("meals")
      .insert(mealRows);

    if (error) throw error;

    // Also update/upsert nutrition_log for the date
    const { data: currentLog } = await supabase.from("nutrition_logs").select("*").eq("user_id", user.id).eq("log_date", date).single();

    const newWater = currentLog?.water_ml || 0;

    // Calculate new totals for the log (or let database triggers do it if they exist)
    // For now we just ensure a log entry exists
    await supabase.from("nutrition_logs").upsert({
      user_id: user.id,
      log_date: date,
      updated_at: new Date().toISOString()
    }, { onConflict: "user_id,log_date" });

    return c.json({ success: true });
  } catch (error) {
    console.error("Save Meal Error:", error);
    return c.json({ error: "Failed to save meal" }, 500);
  }
};

app.post("/nutrition/log", saveMealHandler);
app.post("/make-server-af0ac0fa/nutrition/log", saveMealHandler);

// Nutrition: Add Water
const addWaterHandler = async (c: any) => {
  const supabase = getSupabase(c);
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) return c.json({ error: "Unauthorized" }, 401);

  try {
    const { date, amount } = await c.req.json();

    // Increment water in nutrition_logs
    const { data: currentLog } = await supabase
      .from("nutrition_logs")
      .select("water_ml")
      .eq("user_id", user.id)
      .eq("log_date", date)
      .single();

    const currentWater = currentLog?.water_ml || 0;
    const newWater = currentWater + (amount || 250); // Default 250ml per glass

    const { error } = await supabase
      .from("nutrition_logs")
      .upsert({
        user_id: user.id,
        log_date: date,
        water_ml: newWater,
        updated_at: new Date().toISOString()
      }, { onConflict: "user_id,log_date" });

    if (error) throw error;
    return c.json({ success: true, water: newWater });
  } catch (error) {
    console.error("Add Water Error:", error);
    return c.json({ error: "Failed to log water" }, 500);
  }
};

app.post("/nutrition/water", addWaterHandler);
app.post("/make-server-af0ac0fa/nutrition/water", addWaterHandler);

// Profile
const getProfileHandler = async (c: any) => {
  const supabase = getSupabase(c);
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) return c.json({ error: "Unauthorized" }, 401);

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) return c.json({ success: false, error: error.message }, 500);
  return c.json({ success: true, data });
};

const updateProfileHandler = async (c: any) => {
  const supabase = getSupabase(c);
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) return c.json({ error: "Unauthorized" }, 401);

  try {
    const body = await c.req.json();
    const { profile, interests, privacy } = body;

    const updates: any = {};
    if (profile) Object.assign(updates, profile);
    if (interests) updates.interests = interests.interests;
    if (privacy) updates.privacy_settings = privacy;

    const { error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", user.id);

    if (error) throw error;
    return c.json({ success: true });
  } catch (error) {
    return c.json({ success: false, error: "Update failed" }, 500);
  }
};

app.get("/profile", getProfileHandler);
app.get("/make-server-af0ac0fa/profile", getProfileHandler);
app.post("/profile", updateProfileHandler);
app.post("/make-server-af0ac0fa/profile", updateProfileHandler);

// Legacy Signup (Landing)
app.post("/signup", async (c) => {
  const body = await c.req.json();
  const { email, name, interest } = body;
  if (!email) return c.json({ error: "Email is required" }, 400);

  const key = `signup:${email}`;
  const existing = await kv.get(key);
  if (existing) return c.json({ message: "Already signed up!", success: true });

  const data = { email, name, interest, date: new Date().toISOString() };
  await kv.set(key, data);
  return c.json({ success: true, message: "Welcome to the legacy." });
});

Deno.serve(app.fetch);
