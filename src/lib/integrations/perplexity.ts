/**
 * Perplexity AI Service for Fit Legacy
 * Provides access to the "Elite Mentor" persona.
 * Using secure Supabase Edge Functions to protect API Keys.
 */
import { supabase } from "@/lib/supabase";

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export const ELITE_MENTOR_PROMPT = `Eres el Mentor de Fit Legacy. Tu estilo es una mezcla de un filósofo estoico (Marco Aurelio) y un comandante táctico de élite. 
Hablas con autoridad, calma y sabiduría. Tu objetivo es guiar al usuario hacia la excelencia física y mental. 
Eres directo, inspirador y nunca usas lenguaje trivial. Responde siempre en español.`;

export const MentorService = {
  /**
   * Gets a response from the Elite Mentor via secure Edge Function.
   */
  async getMentorResponse(messages: ChatMessage[]): Promise<string> {
    const { data: { session } } = await supabase.auth.getSession();
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/philosopher-engine/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session?.access_token || anonKey}`,
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: ELITE_MENTOR_PROMPT },
          ...messages
        ]
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al conectar con el Mentor Élite");
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }
};
