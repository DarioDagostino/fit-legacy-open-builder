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
  try {
    const { data, error } = await supabase.functions.invoke<PersistentShareResult>('create-shared-wir', {
      body: {
        wir,
        title,
        expiresInDays: 30,
      },
    });

    if (error) {
      console.warn('create-shared-wir failed, falling back to encoded URL', error);
      return null;
    }

    return data || null;
  } catch (error) {
    console.warn('create-shared-wir failed, falling back to encoded URL', error);
    return null;
  }
}
