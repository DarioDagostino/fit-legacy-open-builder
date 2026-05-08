import { WirProtocol } from './types';

// Encodes a WIR Protocol to a Base64 URL-safe string
export function encodeWir(protocol: WirProtocol): string {
  try {
    const jsonStr = JSON.stringify(protocol);
    // Use modern TextEncoder instead of escape/unescape
    const bytes = new TextEncoder().encode(jsonStr);
    const binString = Array.from(bytes, (byte) =>
      String.fromCodePoint(byte),
    ).join("");
    
    // Base64 encode and make URL safe
    return btoa(binString)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  } catch (err) {
    console.error('Failed to encode WIR protocol', err);
    throw new Error('Encoding failed');
  }
}

// Decodes a Base64 URL-safe string to a WIR Protocol (without validation)
export function decodeWirPayload(encoded: string): unknown {
  try {
    // Restore Base64 padding and characters
    const base64 = encoded
      .replace(/-/g, '+')
      .replace(/_/g, '/');
      
    const binString = atob(base64);
    const bytes = Uint8Array.from(binString, (m) => m.codePointAt(0)!);
    const jsonStr = new TextDecoder().decode(bytes);
    
    return JSON.parse(jsonStr);
  } catch (err) {
    console.error('Failed to decode WIR payload', err);
    throw new Error('Decoding failed');
  }
}
