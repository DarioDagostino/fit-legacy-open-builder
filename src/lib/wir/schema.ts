/**
 * src/lib/wir/schema.ts
 * Validación formal de .wir usando Zod
 */

import { z } from 'zod';

// ─────────────────────────────────────────────────────────────────────────────
// EXERCISE ITEM SCHEMA
// ─────────────────────────────────────────────────────────────────────────────

export const WirExerciseSchema = z.object({
  i: z.string().min(1).max(50).describe('Exercise ID'),
  s: z.number().int().min(1).max(10).describe('Sets (1-10)'),
  r: z.number().int().min(1).max(100).describe('Reps (1-100)'),
  w: z.number().min(0).max(500).describe('Weight in kg (0 = bodyweight)'),
});

export type WirExerciseItem = z.infer<typeof WirExerciseSchema>;

// ─────────────────────────────────────────────────────────────────────────────
// FOOD ITEM SCHEMA
// ─────────────────────────────────────────────────────────────────────────────

export const WirFoodSchema = z.object({
  i: z.string().min(1).max(50).describe('Food ID'),
  q: z.number().int().min(25).max(1000).describe('Quantity in grams (25-1000)'),
});

export type WirFoodItem = z.infer<typeof WirFoodSchema>;

// ─────────────────────────────────────────────────────────────────────────────
// MAIN DOCUMENT SCHEMA
// ─────────────────────────────────────────────────────────────────────────────

export const WirDocumentSchema = z.object({
  v: z.literal(1).describe('Format version (always 1)'),
  n: z.string().min(1).max(100).describe('Routine name'),
  c: z.string().url().or(z.null()).optional().describe('Cover image URL'),
  e: z.array(WirExerciseSchema).optional().describe('Exercises array'),
  f: z.array(WirFoodSchema).optional().describe('Foods array'),
}).strict().refine(
  (doc) => {
    const exerciseCount = doc.e?.length ?? 0;
    const foodCount = doc.f?.length ?? 0;
    return exerciseCount + foodCount > 0;
  },
  { message: 'At least one exercise or food must be present' }
);

export type WirDocument = z.infer<typeof WirDocumentSchema>;

// ─────────────────────────────────────────────────────────────────────────────
// VALIDATION RESULT
// ─────────────────────────────────────────────────────────────────────────────

export interface WirValidationResult {
  valid: boolean;
  errors: string[];
  data?: WirDocument;
}

// ─────────────────────────────────────────────────────────────────────────────
// VALIDATION FUNCTION
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Validates a document against the WIR schema
 * Returns validation result with error details
 */
export function validateWirSchema(data: unknown): WirValidationResult {
  const result = WirDocumentSchema.safeParse(data);

  if (result.success) {
    return {
      valid: true,
      errors: [],
      data: result.data,
    };
  }

  const errors = result.error.errors.map(err => {
    const path = err.path.join('.');
    const message = err.message;
    return path ? `${path}: ${message}` : message;
  });

  return {
    valid: false,
    errors,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// TYPE GUARDS
// ─────────────────────────────────────────────────────────────────────────────

export function isWirExerciseItem(data: unknown): data is WirExerciseItem {
  return WirExerciseSchema.safeParse(data).success;
}

export function isWirFoodItem(data: unknown): data is WirFoodItem {
  return WirFoodSchema.safeParse(data).success;
}

export function isWirDocument(data: unknown): data is WirDocument {
  return WirDocumentSchema.safeParse(data).success;
}
