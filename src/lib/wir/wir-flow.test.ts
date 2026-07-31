import { describe, expect, it } from 'vitest';
import { decodeWir, encodeWir, parseWirUrl, toWirUrl } from './codec';
import { hydrateWir } from './hydrate';
import type { WirDocument } from './schema';

describe('WIR share/open flow', () => {
  it('creates a link, opens it and hydrates a custom exercise', () => {
    const document: WirDocument = {
      v: 1,
      n: 'Rutina de prueba',
      t: 'routine',
      e: [{ i: 'custom_salto', n: 'Salto con cuerda', g: 'cardio', s: 4, r: 30, w: 0 }],
    };
    const link = toWirUrl(document);
    const decoded = parseWirUrl(link);
    expect(decodeWir(link.split('data=')[1])).toEqual(document);
    expect(hydrateWir(decoded).exercises[0]).toMatchObject({ name: 'Salto con cuerda', section: 'cardio' });
    expect(encodeWir(document)).toBe(link.split('data=')[1]);
  });
});
