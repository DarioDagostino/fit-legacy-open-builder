import { supabase } from './supabase';
import type { WirDocument } from './wir';

type PersistentShareResult = {
  slug: string;
  url: string;
  ogUrl: string;
  expiresAt: string;
};

export async function createPersistentWirShare(
  wir: WirDocument,
  title: string,
): Promise<PersistentShareResult | null> {
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const result = await Promise.race([
        supabase.functions.invoke<PersistentShareResult>('create-shared-wir', {
          body: { wir, title, expiresInDays: 30 },
        }),
        new Promise<never>((_, reject) => setTimeout(() => reject(new Error('Share request timed out')), 8000)),
      ]);
      if (!result.error && result.data) return result.data;
      throw result.error || new Error('Share function returned no data');
    } catch (error) {
      if (attempt === 1) console.warn('create-shared-wir failed, falling back to encoded URL', error);
      else await new Promise((resolve) => setTimeout(resolve, 350));
    }
  }
  return null;
}
