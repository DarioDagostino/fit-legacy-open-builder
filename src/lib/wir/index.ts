export * from './types';
export * from './validator';
export * from './codec';
export * from './hydrate';

// Convenience wrapper for the entire flow (decode -> validate -> hydrate)
import { decodeWirPayload } from './codec';
import { validateWir } from './validator';
import { hydrateWir } from './hydrate';
import { HydratedWirProtocol } from './types';

export function processWirLink(encodedData: string): { success: boolean; data?: HydratedWirProtocol; errors?: string[] } {
  try {
    const decoded = decodeWirPayload(encodedData);
    const validation = validateWir(decoded);
    
    if (!validation.valid || !validation.data) {
      return { success: false, errors: validation.errors };
    }
    
    const hydrated = hydrateWir(validation.data);
    return { success: true, data: hydrated };
  } catch (err: any) {
    return { success: false, errors: [err.message || 'Error processing WIR link'] };
  }
}
