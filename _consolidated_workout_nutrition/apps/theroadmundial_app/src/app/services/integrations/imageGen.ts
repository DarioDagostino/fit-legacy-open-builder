/**
 * Image Generation Service for Fit Legacy - Nutrition AI
 * Provides fotorrealistic meal visualization via OpenAI DALL-E 3.
 * Using secure Supabase Edge Functions to protect API Keys.
 */
import { supabase } from "@/lib/supabase";

export const ImageGenService = {
  /**
   * Generates a realistic, gourmet-style image of a meal via secure Edge Function.
   */
  async generateMealImage(description: string): Promise<string> {
    const { data: { session } } = await supabase.auth.getSession();
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/philosopher-engine/visualize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.access_token || anonKey}`,
      },
      body: JSON.stringify({
        prompt: `A professional, gourmet, high-resolution food photograph of the following meal: ${description}. The lighting should be soft and natural, emphasizing the textures and colors of the ingredients. Minimalist tactical background.`
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to generate image via Edge Function');
    }

    const data = await response.json();
    return data.data[0].url || '';
  }
};
