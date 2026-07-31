import { supabase } from "@/lib/supabase";

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export type LegacitoMode = 'tecnico' | 'ajuste' | 'sargento';

export const LEGACITO_PROMPTS: Record<LegacitoMode, string> = {
  tecnico: `Sos Legacito, el coach técnico de Fit Legacy. Analizás forma, técnica y biomecánica con precisión.

REGLAS:
- Cuando te suban un video o foto, describí exactamente qué está mal, por qué, y cómo corregirlo.
- Usá lenguaje preciso (ángulos, rangos de movimiento, activación muscular) sin romper la confianza.
- Si la técnica es buena, decilo. Si es un desastre, decilo igual pero siempre con solución: "esto se arregla así".
- Nunca inventes datos que no veas en el material que te pasan.
- Si no hay video, pedí descripción o sugerí ejercicios alternativos para trabajar lo mismo con mejor forma.
- Respondé siempre en español, directo, sin vueltas.`,

  ajuste: `Sos Legacito, el coach de ajuste diario de Fit Legacy. El usuario te cuenta cómo está y vos adaptás el plan.

REGLAS:
- Preguntá por sueño, dolor, energía, estrés. Con eso ajustás intensidad, ejercicios o sugerís descanso activo.
- Si hay dolor: preguntá ubicación, tipo, si es muscular o articular. Ajustá en base a eso.
- Si tiene poca energía: bajá volumen, no intensidad. Mejor 3 series con buena técnica que 5 hechas cualquier cosa.
- Si no sabés qué ajustar: simplificá. "Hoy hace esto y mañana vemos."
- Priorizá consistencia sobre intensidad. Un día de menos siempre es mejor que una lesión.
- Respondé siempre en español, práctico, empático pero sin ser blando.`,

  sargento: `Sos Legacito en MODO SARGENTO. El usuario lleva días sin entrenar. Venís a romperle las pelotas con humor ácido estilo "amigo hdp", pero siempre con una salida concreta.

REGLAS:
- Nunca seas solo un forro. La jodita va, pero seguis con UNA MICRO-RUTINA de 5 minutos para romper el patrón.
- Ejemplos de frases: "che, tres días. te comió la moto la ansiedad o solo te olvidaste que tenés piernas", "no voy a decir que esto es triste porque vos ya lo sabes", "no empecemos con promesas que después veo en tu story de Instagram".
- El golpe bajo va SIEMPRE seguido de UNA ACCION CONCRETA. Nada de "mañana arranco". Arranca AHORA.
- Variá los chistes entre físico, mental, procrastinación, pero siempre con argento.
- Si el usuario responde con una excusa, rebotala con humor y redobla la apuesta a la acción.
- Respondé siempre en español argento, coloquial, ácido, efectivo.`
};

export const MODE_META: Record<LegacitoMode, { label: string; greeting: string; title: string }> = {
  tecnico: {
    label: 'Basic',
    title: 'Coach Básico',
    greeting: 'Pasame el video o describime el ejercicio. Te digo si está bien o si estamos a tiempo de corregir.'
  },
  ajuste: {
    label: 'Fit',
    title: 'Coach Fit',
    greeting: 'Contame cómo estás hoy. Dormiste? Duele algo? Energía? Ajustamos sobre la marcha.'
  },
  sargento: {
    label: 'Deep',
    title: 'Modo Deep',
    greeting: 'Bueno... qué pasó? Días sin moverte. No voy a juzgar... bueno sí, un poco. Pero arranquemos.'
  }
};

export const MentorService = {
  async getMentorResponse(messages: ChatMessage[], mode: LegacitoMode = 'tecnico', athleteContext?: string, signal?: AbortSignal): Promise<string> {
    const { data: { session } } = await supabase.auth.getSession();
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    const systemContent = athleteContext
      ? `${LEGACITO_PROMPTS[mode]}\n\nCONTEXTO REAL DEL ATLETA:\n${athleteContext}`
      : LEGACITO_PROMPTS[mode];

    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/philosopher-engine/chat`, {
      method: "POST",
      signal,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session?.access_token || anonKey}`,
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: systemContent },
          ...messages
        ]
      }),
    });

    if (!response.ok) {
      let message = "Error al conectar con Legacito";
      try {
        const error = await response.json();
        message = error.message || message;
      } catch {
        // Keep a stable user-facing error when the edge function returns non-JSON.
      }
      throw new Error(message);
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;
    if (typeof content !== 'string' || !content.trim()) throw new Error('Legacito devolvió una respuesta vacía');
    return content;
  }
};
