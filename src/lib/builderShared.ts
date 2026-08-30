/**
 * Standalone Builder compatibility surface.
 *
 * The monorepo exposes these guide helpers from @fit-legacy/shared/builder.
 * The standalone deploy repo only carries the consolidated legacy catalog, so
 * keep the optional guide surface inert until its package is bundled here.
 */
export * from '../../_consolidated_workout_nutrition/packages/shared/index';

import type {
  Exercise,
  ExerciseCategory,
} from '../../_consolidated_workout_nutrition/packages/shared/index';

export type ExerciseSection = Exercise['section'];

export const WORKOUT_GUIDE_EXERCISES: Exercise[] = [];
export const WORKOUT_GUIDE_CATEGORIES: Record<string, ExerciseCategory[]> = {};

export function getWorkoutGuideAssetUrl(
  _slugOrId: string,
  _frame: 1 | 2 | 3 = 1,
  _version = '1.0.0',
): string | null {
  return null;
}

export function getWorkoutGuideFrameAttribution(
  _slugOrId: string,
  _frame: 1 | 2 | 3,
) {
  return null;
}

export function getLegacyMappedSlug(_legacyName: string): string | null {
  return null;
}

export function getLegacyMappedAssetUrl(
  _legacyName: string,
  _frame: 1 | 2 | 3 = 1,
): string | null {
  return null;
}

export function getExerciseAssetUrl(
  _exercise: { id: string; name: string; _source?: string },
  _frame: 1 | 2 | 3 = 1,
): string | null {
  return null;
}
