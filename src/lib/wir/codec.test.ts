/**
 * src/lib/wir/codec.test.ts
 * Unit tests for WIR codec (encode/decode)
 */

import { describe, it, expect } from 'vitest';
import { encodeWir, decodeWir, toWirUrl, parseWirUrl, getPayloadSize, exceedsWhatsAppLimit } from './codec';
import type { WirDocument } from './schema';

// ─────────────────────────────────────────────────────────────────────────────
// TEST DATA
// ─────────────────────────────────────────────────────────────────────────────

const SIMPLE_ROUTINE: WirDocument = {
  v: 1,
  n: 'FULL_BODY_A',
  e: [
    { i: 'press_banca', s: 4, r: 10, w: 80 },
    { i: 'sentadilla', s: 4, r: 8, w: 100 },
  ],
};

const WITH_FOODS: WirDocument = {
  v: 1,
  n: 'MEAL_PREP_DAY',
  f: [
    { i: 'pollo', q: 200 },
    { i: 'arroz', q: 150 },
    { i: 'brocoli', q: 100 },
  ],
};

const MIXED_ROUTINE: WirDocument = {
  v: 1,
  p: 'navy',
  n: 'COMPLETE_PROTOCOL',
  c: 'https://example.com/image.jpg',
  e: [
    { i: 'press_banca', s: 4, r: 10, w: 80 },
    { i: 'peso_muerto', s: 3, r: 5, w: 140 },
    { i: 'dominadas', s: 4, r: 8, w: 0 },
  ],
  f: [
    { i: 'pollo', q: 300 },
    { i: 'batata', q: 200 },
    { i: 'aguacate', q: 100 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// ENCODING TESTS
// ─────────────────────────────────────────────────────────────────────────────

describe('encodeWir', () => {
  it('should encode simple routine', () => {
    const encoded = encodeWir(SIMPLE_ROUTINE);
    expect(typeof encoded).toBe('string');
    expect(encoded.length).toBeGreaterThan(0);
    // Should not contain +, /, = (URL-safe)
    expect(encoded).not.toMatch(/[+/=]/);
  });

  it('should encode routine with foods', () => {
    const encoded = encodeWir(WITH_FOODS);
    expect(typeof encoded).toBe('string');
    expect(encoded.length).toBeGreaterThan(0);
  });

  it('should encode mixed routine', () => {
    const encoded = encodeWir(MIXED_ROUTINE);
    expect(typeof encoded).toBe('string');
    expect(encoded.length).toBeGreaterThan(0);
  });

  it('should produce consistent output', () => {
    const encoded1 = encodeWir(SIMPLE_ROUTINE);
    const encoded2 = encodeWir(SIMPLE_ROUTINE);
    expect(encoded1).toBe(encoded2);
  });

  it('should throw on invalid document', () => {
    const invalid = { v: 1, n: 'test' }; // missing e or f
    expect(() => encodeWir(invalid as any)).toThrow();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// DECODING TESTS
// ─────────────────────────────────────────────────────────────────────────────

describe('decodeWir', () => {
  it('should decode encoded routine', () => {
    const encoded = encodeWir(SIMPLE_ROUTINE);
    const decoded = decodeWir(encoded);
    expect(decoded.n).toBe(SIMPLE_ROUTINE.n);
    expect(decoded.e).toEqual(SIMPLE_ROUTINE.e);
  });

  it('should decode routine with foods', () => {
    const encoded = encodeWir(WITH_FOODS);
    const decoded = decodeWir(encoded);
    expect(decoded.n).toBe(WITH_FOODS.n);
    expect(decoded.f).toEqual(WITH_FOODS.f);
  });

  it('should decode mixed routine correctly', () => {
    const encoded = encodeWir(MIXED_ROUTINE);
    const decoded = decodeWir(encoded);
    expect(decoded).toEqual(MIXED_ROUTINE);
    expect(decoded.p).toBe('navy');
  });

  it('should throw on invalid base64', () => {
    expect(() => decodeWir('invalid@@@')).toThrow();
  });

  it('should throw on invalid JSON', () => {
    const invalidJson = Buffer.from('not json').toString('base64');
    expect(() => decodeWir(invalidJson)).toThrow();
  });

  it('should throw on invalid schema', () => {
    const invalid = JSON.stringify({ v: 1, n: 'test' }); // missing e or f
    const invalidBase64 = Buffer.from(invalid).toString('base64').replace(/\+/g, '-').replace(/\//g, '_');
    expect(() => decodeWir(invalidBase64)).toThrow();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// ROUND-TRIP TESTS
// ─────────────────────────────────────────────────────────────────────────────

describe('encode/decode round-trip', () => {
  it('should preserve simple routine', () => {
    const encoded = encodeWir(SIMPLE_ROUTINE);
    const decoded = decodeWir(encoded);
    expect(decoded).toEqual(SIMPLE_ROUTINE);
  });

  it('should preserve routine with foods', () => {
    const encoded = encodeWir(WITH_FOODS);
    const decoded = decodeWir(encoded);
    expect(decoded).toEqual(WITH_FOODS);
  });

  it('should preserve mixed routine', () => {
    const encoded = encodeWir(MIXED_ROUTINE);
    const decoded = decodeWir(encoded);
    expect(decoded).toEqual(MIXED_ROUTINE);
  });

  it('should handle multiple round-trips', () => {
    let current = SIMPLE_ROUTINE;
    for (let i = 0; i < 5; i++) {
      const encoded = encodeWir(current);
      current = decodeWir(encoded);
    }
    expect(current).toEqual(SIMPLE_ROUTINE);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// URL TESTS
// ─────────────────────────────────────────────────────────────────────────────

describe('toWirUrl', () => {
  it('should generate valid URL', () => {
    const url = toWirUrl(SIMPLE_ROUTINE);
    expect(url).toMatch(/^https:\/\/builder\.fitlegacy\.app\/r\/wir\?data=/);
  });

  it('should generate URL with custom base', () => {
    const url = toWirUrl(SIMPLE_ROUTINE, 'https://example.com/wir');
    expect(url).toMatch(/^https:\/\/example\.com\/wir\?data=/);
  });

  it('should encode all necessary data in URL', () => {
    const url = toWirUrl(SIMPLE_ROUTINE);
    const urlObj = new URL(url);
    const data = urlObj.searchParams.get('data');
    expect(data).toBeTruthy();
  });
});

describe('parseWirUrl', () => {
  it('should parse generated URL', () => {
    const url = toWirUrl(SIMPLE_ROUTINE);
    const parsed = parseWirUrl(url);
    expect(parsed).toEqual(SIMPLE_ROUTINE);
  });

  it('should parse URL with mixed routine', () => {
    const url = toWirUrl(MIXED_ROUTINE);
    const parsed = parseWirUrl(url);
    expect(parsed).toEqual(MIXED_ROUTINE);
  });

  it('should throw on missing data param', () => {
    expect(() => parseWirUrl('https://example.com?foo=bar')).toThrow();
  });

  it('should throw on invalid data', () => {
    expect(() => parseWirUrl('https://example.com?data=invalid')).toThrow();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// SIZE TESTS
// ─────────────────────────────────────────────────────────────────────────────

describe('getPayloadSize', () => {
  it('should return size metrics', () => {
    const sizes = getPayloadSize(SIMPLE_ROUTINE);
    expect(sizes).toHaveProperty('json');
    expect(sizes).toHaveProperty('base64');
    expect(sizes).toHaveProperty('urlSafe');
    expect(sizes).toHaveProperty('estimated');
  });

  it('should have increasing sizes', () => {
    const sizes = getPayloadSize(SIMPLE_ROUTINE);
    expect(sizes.json > 0).toBe(true);
    expect(sizes.base64 >= sizes.json).toBe(true);
    expect(sizes.urlSafe <= sizes.base64).toBe(true); // URL-safe is same or smaller
  });

  it('should estimate full URL correctly', () => {
    const sizes = getPayloadSize(SIMPLE_ROUTINE);
    const url = toWirUrl(SIMPLE_ROUTINE);
    expect(sizes.estimated).toBe(url.length);
  });
});

describe('exceedsWhatsAppLimit', () => {
  it('should return false for small routine', () => {
    expect(exceedsWhatsAppLimit(SIMPLE_ROUTINE, 2000)).toBe(false);
  });

  it('should respect custom limit', () => {
    const sizes = getPayloadSize(SIMPLE_ROUTINE);
    expect(exceedsWhatsAppLimit(SIMPLE_ROUTINE, sizes.estimated - 1)).toBe(true);
  });
});
