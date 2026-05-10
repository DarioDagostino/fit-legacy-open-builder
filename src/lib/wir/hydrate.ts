/**
 * src/lib/wir/hydrate.ts
 * Converts decoded WIR document to internal app structures
 */

import { WirDocument } from './schema';
import { getExerciseById, getFoodById } from '@fit-legacy/shared';

export interface HydratedRoutine {
  name: string;
  coverImageUrl: string | null;
  exercises: Array<{
    id: string;
    name: string;
    section: string;
    sets: number;
    reps: number;
    weight: number;
  }>;
  foods: Array<{
    id: string;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    category?: string;
    quantity: number;
  }>;
}

/**
 * Converts a validated WIR document to app internal structure
 * Resolves IDs to full exercise/food data
 */
export function hydrateWir(doc: WirDocument): HydratedRoutine {
  // Hydrate exercises
  const exercises = (doc.e || []).map(e => {
    const exerciseData = getExerciseById(e.i);
    if (!exerciseData) {
      throw new Error(`Exercise not found: ${e.i}`);
    }

    return {
      id: e.i,
      name: exerciseData.name,
      section: exerciseData.section,
      sets: e.s,
      reps: e.r,
      weight: e.w,
    };
  });

  // Hydrate foods
  const foods = (doc.f || []).map(f => {
    const foodData = getFoodById(f.i);
    if (!foodData) {
      throw new Error(`Food not found: ${f.i}`);
    }

    return {
      id: f.i,
      name: foodData.name,
      calories: foodData.calories,
      protein: foodData.protein,
      carbs: foodData.carbs,
      fats: foodData.fats,
      category: foodData.category,
      quantity: f.q,
    };
  });

  return {
    name: doc.n,
    coverImageUrl: doc.c || null,
    exercises,
    foods,
  };
}
