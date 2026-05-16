export type NvidiaGenerateInput = {
  prompt: string;
  style?: string;
  model?: string;
  category?: string;
  tags?: string[];
};

export type NvidiaGenerateOutput = {
  url: string;
  isFallback?: boolean;
  source?: 'local-premium';
};

import { getPremiumFallbackImage } from './imageRouter';

/**
 * Fallback local para mantener el flujo del builder funcionando en dev.
 * No requiere API key ni servicios externos para renderizar una portada.
 */
export class NvidiaImageService {
  async generate(input: NvidiaGenerateInput): Promise<NvidiaGenerateOutput> {
    return {
      url: getPremiumFallbackImage(input.category || input.style || 'oversize', input.tags || [], input.prompt),
      isFallback: true,
      source: 'local-premium',
    };
  }
}
