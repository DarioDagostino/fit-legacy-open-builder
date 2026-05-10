/**
 * src/lib/wir/validator.ts
 * Full validation for .wir documents
 * Includes schema validation + catalog checking
 */

import { WirDocument, validateWirSchema, WirValidationResult } from './schema';
import { hasExercise, hasFood } from '@fit-legacy/shared';

// ─────────────────────────────────────────────────────────────────────────────
// VALIDATION OPTIONS
// ─────────────────────────────────────────────────────────────────────────────

export interface WirValidationOptions {
  checkCatalog?: boolean; // Verify IDs exist in catalog (default: true)
  checkSize?: boolean;    // Check WhatsApp URL limit (default: true)
  strict?: boolean;       // Reject unknown fields (default: true)
}

export interface FullWirValidationResult extends WirValidationResult {
  catalogErrors?: string[];
  sizeWarnings?: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN VALIDATION FUNCTION
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Comprehensive validation of a WIR document
 * - Schema validation
 * - Catalog ID verification
 * - Size checking
 */
export function validateWir(
  data: unknown,
  options: WirValidationOptions = {}
): FullWirValidationResult {
  const {
    checkCatalog = true,
    checkSize = true,
    strict = true,
  } = options;

  // ───────────────────────────────────────────────────────────────────────────
  // STEP 1: Schema Validation
  // ───────────────────────────────────────────────────────────────────────────

  const schemaResult = validateWirSchema(data);

  if (!schemaResult.valid) {
    return {
      valid: false,
      errors: schemaResult.errors,
    };
  }

  const doc = schemaResult.data!;
  let errors = [...schemaResult.errors];
  let catalogErrors: string[] = [];
  let sizeWarnings: string[] = [];

  // ───────────────────────────────────────────────────────────────────────────
  // STEP 2: Catalog Validation (if enabled)
  // ───────────────────────────────────────────────────────────────────────────

  if (checkCatalog) {
    catalogErrors = validateCatalog(doc);
    errors = [...errors, ...catalogErrors];
  }

  // ───────────────────────────────────────────────────────────────────────────
  // STEP 3: Size Checking (if enabled)
  // ───────────────────────────────────────────────────────────────────────────

  if (checkSize) {
    sizeWarnings = validateSize(doc);
  }

  // ───────────────────────────────────────────────────────────────────────────
  // RETURN RESULT
  // ───────────────────────────────────────────────────────────────────────────

  return {
    valid: errors.length === 0,
    errors,
    data: doc,
    catalogErrors,
    sizeWarnings,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// CATALOG VALIDATION
// ─────────────────────────────────────────────────────────────────────────────

function validateCatalog(doc: WirDocument): string[] {
  const errors: string[] = [];

  // Check exercises exist in catalog
  if (doc.e && doc.e.length > 0) {
    for (const exercise of doc.e) {
      if (!hasExercise(exercise.i)) {
        errors.push(`Unknown exercise ID: "${exercise.i}"`);
      }
    }
  }

  // Check foods exist in catalog
  if (doc.f && doc.f.length > 0) {
    for (const food of doc.f) {
      if (!hasFood(food.i)) {
        errors.push(`Unknown food ID: "${food.i}"`);
      }
    }
  }

  return errors;
}

// ─────────────────────────────────────────────────────────────────────────────
// SIZE VALIDATION
// ─────────────────────────────────────────────────────────────────────────────

function validateSize(doc: WirDocument): string[] {
  const warnings: string[] = [];
  const { encodeWir, getPayloadSize } = require('./codec');

  try {
    const sizes = getPayloadSize(doc);

    // Warn if close to WhatsApp limit
    if (sizes.estimated > 1800) {
      warnings.push(
        `⚠️  URL is ${sizes.estimated} bytes (limit: 2000). ` +
        `Remove ${sizes.estimated - 1800} bytes to be safe.`
      );
    }

    // Warn if too many items
    const itemCount = (doc.e?.length || 0) + (doc.f?.length || 0);
    if (itemCount > 25) {
      warnings.push(
        `⚠️  Large routine (${itemCount} items). Consider splitting ` +
        `to keep URL short for WhatsApp.`
      );
    }
  } catch (error) {
    // Silently fail size check
  }

  return warnings;
}

// ─────────────────────────────────────────────────────────────────────────────
// QUICK VALIDATORS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Quick validation - just schema, no catalog or size checks
 */
export function isValidWir(data: unknown): boolean {
  const result = validateWir(data, { checkCatalog: false, checkSize: false });
  return result.valid;
}

/**
 * Validate and throw on error
 */
export function validateWirStrict(data: unknown, options?: WirValidationOptions): WirDocument {
  const result = validateWir(data, options);

  if (!result.valid) {
    const errorMsg = result.errors.join('\n  - ');
    throw new Error(`Invalid WIR document:\n  - ${errorMsg}`);
  }

  return result.data!;
}

// ─────────────────────────────────────────────────────────────────────────────
// HUMAN-READABLE ERROR MESSAGES
// ─────────────────────────────────────────────────────────────────────────────

export function formatValidationErrors(result: FullWirValidationResult): string {
  const lines: string[] = [];

  if (result.valid) {
    return '✅ Valid WIR document';
  }

  lines.push('❌ Validation failed:\n');

  if (result.errors.length > 0) {
    lines.push('Schema errors:');
    result.errors.forEach(err => lines.push(`  - ${err}`));
  }

  if (result.catalogErrors && result.catalogErrors.length > 0) {
    lines.push('\nCatalog errors:');
    result.catalogErrors.forEach(err => lines.push(`  - ${err}`));
  }

  if (result.sizeWarnings && result.sizeWarnings.length > 0) {
    lines.push('\nWarnings:');
    result.sizeWarnings.forEach(warn => lines.push(`  ${warn}`));
  }

  return lines.join('\n');
}

// ─────────────────────────────────────────────────────────────────────────────
// STATS & SUMMARY
// ─────────────────────────────────────────────────────────────────────────────

export interface WirSummary {
  name: string;
  exerciseCount: number;
  foodCount: number;
  hasCover: boolean;
  version: number;
}

export function summarizeWir(doc: WirDocument): WirSummary {
  return {
    name: doc.n,
    exerciseCount: doc.e?.length ?? 0,
    foodCount: doc.f?.length ?? 0,
    hasCover: !!doc.c,
    version: doc.v,
  };
}

export function printWirSummary(doc: WirDocument): void {
  const summary = summarizeWir(doc);
  console.log(`📋 WIR Summary: "${summary.name}"`);
  console.log(`  Version: v${summary.version}`);
  console.log(`  Exercises: ${summary.exerciseCount}`);
  console.log(`  Foods: ${summary.foodCount}`);
  console.log(`  Cover: ${summary.hasCover ? '✅' : '❌'}`);
}
