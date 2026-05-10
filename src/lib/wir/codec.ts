/**
 * src/lib/wir/codec.ts
 * Encoding/Decoding for .wir format
 * Converts between WirDocument and Base64 URL-safe string
 */

import { WirDocument, WirDocumentSchema } from './schema';

// ─────────────────────────────────────────────────────────────────────────────
// ENCODING (Document → Base64 URL-safe)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Encodes a WirDocument to Base64 URL-safe string
 * @param doc - Valid WirDocument
 * @returns Base64 URL-safe encoded string
 * @throws Error if document is invalid
 */
export function encodeWir(doc: WirDocument): string {
  // Validate first
  const validation = WirDocumentSchema.safeParse(doc);
  if (!validation.success) {
    throw new Error(`Invalid WIR document: ${validation.error.message}`);
  }

  // Serialize to JSON
  const json = JSON.stringify(doc);

  // Encode to Base64
  const base64 = btoa(json);

  // Convert to URL-safe format
  const urlSafe = base64
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');

  return urlSafe;
}

/**
 * Creates a full shareable URL with .wir payload
 * @param doc - Valid WirDocument
 * @param baseUrl - Base URL (default: fitlegacy.app)
 * @returns Full URL ready to share
 */
export function toWirUrl(doc: WirDocument, baseUrl = 'https://builder.fitlegacy.app'): string {
  const encoded = encodeWir(doc);
  return `${baseUrl}/r/wir?data=${encoded}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// DECODING (Base64 URL-safe → Document)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Decodes a Base64 URL-safe string to WirDocument
 * @param encoded - Base64 URL-safe encoded string
 * @returns Decoded and validated WirDocument
 * @throws Error if decoding or validation fails
 */
export function decodeWir(encoded: string): WirDocument {
  // Convert from URL-safe format back to standard Base64
  const base64 = encoded
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  // Add padding if needed
  const remainder = base64.length % 4;
  const padded = base64 + '='.repeat(remainder === 0 ? 0 : 4 - remainder);

  // Decode from Base64
  let json: string;
  try {
    json = atob(padded);
  } catch (error) {
    throw new Error(`Invalid Base64 encoding: ${error}`);
  }

  // Parse JSON
  let data: unknown;
  try {
    data = JSON.parse(json);
  } catch (error) {
    throw new Error(`Invalid JSON in payload: ${error}`);
  }

  // Validate structure
  const validation = WirDocumentSchema.safeParse(data);
  if (!validation.success) {
    throw new Error(`Invalid WIR document: ${validation.error.message}`);
  }

  return validation.data;
}

/**
 * Parses a full .wir URL and extracts the document
 * @param url - Full URL with ?data=... parameter
 * @returns Decoded and validated WirDocument
 * @throws Error if URL is invalid or payload is malformed
 */
export function parseWirUrl(url: string): WirDocument {
  try {
    const urlObj = new URL(url);
    const encoded = urlObj.searchParams.get('data');

    if (!encoded) {
      throw new Error('Missing "data" query parameter');
    }

    return decodeWir(encoded);
  } catch (error) {
    throw new Error(`Failed to parse WIR URL: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// UTILITIES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calculates the size of an encoded .wir payload
 * Useful for estimating WhatsApp URL length
 */
export function getPayloadSize(doc: WirDocument): {
  json: number;
  base64: number;
  urlSafe: number;
  estimated: number;
} {
  const json = JSON.stringify(doc);
  const base64 = btoa(json);
  const urlSafe = encodeWir(doc);

  // Estimate full URL length
  const baseUrl = 'https://builder.fitlegacy.app/r/wir?data=';
  const estimated = baseUrl.length + urlSafe.length;

  return {
    json: json.length,
    base64: base64.length,
    urlSafe: urlSafe.length,
    estimated,
  };
}

/**
 * Check if payload will exceed WhatsApp URL limit (~2000 chars)
 */
export function exceedsWhatsAppLimit(doc: WirDocument, limit = 2000): boolean {
  const size = getPayloadSize(doc);
  return size.estimated > limit;
}

/**
 * Pretty prints size statistics
 */
export function printPayloadStats(doc: WirDocument): void {
  const sizes = getPayloadSize(doc);
  console.log('📊 WIR Payload Statistics:');
  console.log(`  JSON: ${sizes.json} bytes`);
  console.log(`  Base64: ${sizes.base64} bytes`);
  console.log(`  URL-safe: ${sizes.urlSafe} bytes`);
  console.log(`  Full URL: ${sizes.estimated} bytes`);
  console.log(`  Fits WhatsApp: ${!exceedsWhatsAppLimit(doc) ? '✅ Yes' : '❌ No (too large)'}`);
}
