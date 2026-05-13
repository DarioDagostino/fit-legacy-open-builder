// Supabase Edge Function: create-mp-preference
// Actúa como proxy seguro para la API de Mercado Pago.
// El Access Token NUNCA se expone al cliente.
//
// VARIABLES DE ENTORNO REQUERIDAS (Supabase Secrets):
//   MP_ACCESS_TOKEN = tu token de MP (prueba o producción)
//
// Para configurar en producción:
//   supabase secrets set MP_ACCESS_TOKEN=APP_USR-xxxxx

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const MP_API_URL = "https://api.mercadopago.com/checkout/preferences";

serve(async (req: Request) => {
    // Handle CORS preflight
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        const accessToken = Deno.env.get("MP_ACCESS_TOKEN");
        if (!accessToken) {
            return new Response(
                JSON.stringify({ error: "Falta configurar MP_ACCESS_TOKEN en secretos de entorno" }),
                { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
        }
        const isSandbox = accessToken.startsWith("TEST-");

        const {
            title,
            description,
            price,
            currency = "ARS",
            userEmail,
            userId,
            planType = "monthly", // "monthly" | "annual" | "lifetime"
            source = "web",       // "web" | "mobile"
            donationMode = false,
        } = await req.json();

        const isDonation = Boolean(donationMode || planType === "donation");
        const numericPrice = Number(price);

        if (!title || !price || (!isDonation && !userEmail)) {
            return new Response(
                JSON.stringify({ error: isDonation ? "Faltan campos requeridos: title, price" : "Faltan campos requeridos: title, price, userEmail" }),
                { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
        }

        if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
            return new Response(
                JSON.stringify({ error: "El campo price debe ser un numero mayor a 0" }),
                { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
        }

        // URLs de retorno según origen
        const baseWebUrl = "https://fitlegacy.app";
        const backUrls = source === "mobile"
            ? {
                success: "fitlegacy://payment/success",
                failure: "fitlegacy://payment/failure",
                pending: "fitlegacy://payment/pending",
            }
            : {
                success: `${baseWebUrl}/payment/success`,
                failure: `${baseWebUrl}/payment/failure`,
                pending: `${baseWebUrl}/payment/pending`,
            };

        const preference = {
            items: [
                {
                    title,
                    description: description || title,
                    quantity: 1,
                    currency_id: currency,
                    unit_price: numericPrice,
                },
            ],
            ...(userEmail
                ? {
                    payer: {
                        email: userEmail,
                        ...(userId && { external_reference: userId }),
                    },
                }
                : {}),
            back_urls: backUrls,
            auto_return: "approved",
            ...(!isDonation
                ? {
                    payment_methods: {
                        excluded_payment_types: [
                            { id: "ticket" }, // Excluye efectivo para suscripciones
                        ],
                        installments: 1,
                    },
                }
                : {}),
            statement_descriptor: "FIT LEGACY PRO",
            external_reference: userId || (isDonation ? "donation-anonymous" : "anonymous"),
            metadata: {
                plan_type: isDonation ? "donation" : planType,
                donation_mode: isDonation,
                source,
                user_id: userId || null,
            },
        };

        const response = await fetch(MP_API_URL, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(preference),
        });

        const data = await response.json();

        if (response.status !== 201) {
            console.error("MP Error:", data);
            return new Response(
                JSON.stringify({ error: "Error al crear preferencia de Mercado Pago", details: data }),
                { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
        }

        return new Response(
            JSON.stringify({
                preference_id: data.id,
                // En sandbox se usa sandbox_init_point, en producción init_point
                init_point: isSandbox ? data.sandbox_init_point : data.init_point,
                sandbox_init_point: data.sandbox_init_point,
                is_sandbox: isSandbox,
            }),
            { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Edge Function Error:", error);
        return new Response(
            JSON.stringify({ error: "Error interno del servidor" }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }
});
