/**
 * src/lib/wir/index.ts
 * Central export for all WIR functionality
 */

// Schema & Types
export {
  WirDocumentSchema,
  WirExerciseSchema,
  WirFoodSchema,
  WirPaletteSchema,
  validateWirSchema,
  isWirDocument,
  isWirExerciseItem,
  isWirFoodItem,
  type WirDocument,
  type WirExerciseItem,
  type WirFoodItem,
  type WirPalette,
  type WirValidationResult,
} from './schema';

// Codec (Encode/Decode)
export {
  encodeWir,
  decodeWir,
  toWirUrl,
  parseWirUrl,
  getPayloadSize,
  exceedsWhatsAppLimit,
  printPayloadStats,
} from './codec';

// Validator
export {
  validateWir,
  validateWirStrict,
  isValidWir,
  formatValidationErrors,
  summarizeWir,
  printWirSummary,
  type WirValidationOptions,
  type FullWirValidationResult,
  type WirSummary,
} from './validator';

// Hydration (Decode to App Structures)
export {
  hydrateWir,
  type HydratedRoutine,
} from './hydrate';

// Legacy compatibility
export {
  processWirLink,
  type ProcessWirLinkResult,
} from './process-link';
