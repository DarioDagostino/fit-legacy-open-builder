export type NvidiaGenerateInput = {
  prompt: string;
  style?: string;
  model?: string;
};

export type NvidiaGenerateOutput = {
  url: string;
};

/**
 * Fallback local para mantener el flujo del builder funcionando en dev.
 * No requiere API key ni servicios externos para renderizar una portada.
 */
export class NvidiaImageService {
  async generate(input: NvidiaGenerateInput): Promise<NvidiaGenerateOutput> {
    const encoded = encodeURIComponent(input.prompt || 'fit legacy');
    // Usa un placeholder remoto simple para no romper el flujo visual en local.
    return {
      url: `https://picsum.photos/seed/${encoded}/1280/720`,
    };
  }
}
