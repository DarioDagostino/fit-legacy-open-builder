/**
 * src/lib/wir/process-link.ts
 * Legacy compatibility: processWirLink helper
 */

import { decodeWir, validateWir, hydrateWir } from './index';

export interface ProcessWirLinkResult {
  success: boolean;
  data?: any;
  error?: string;
}

/**
 * Legacy function for backward compatibility
 * Processes a WIR data parameter and returns hydrated routine
 */
export function processWirLink(encoded: string): ProcessWirLinkResult {
  try {
    // Decode the Base64 URL-safe string
    const decoded = decodeWir(encoded);
    
    // Validate
    const validation = validateWir(decoded);
    if (!validation.valid) {
      return {
        success: false,
        error: `Validation failed: ${validation.errors.join(', ')}`
      };
    }

    // Hydrate to app structures
    const hydrated = hydrateWir(validation.data!);

    return {
      success: true,
      data: hydrated
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
