import { UNIFIED_EXERCISES, UNIFIED_FOODS } from '@fit-legacy/shared';
import { WirProtocol, HydratedWirProtocol, ExpandedExercise, ExpandedFood } from './types';

export function hydrateWir(protocol: WirProtocol): HydratedWirProtocol {
  const allExercises = Object.values(UNIFIED_EXERCISES).flatMap(s => s.flatMap((g: any) => g.exercises));
  const allFoods = Object.values(UNIFIED_FOODS).flat() as any[];

  const hydratedExercises: ExpandedExercise[] = (protocol.e || []).map(minEx => {
    const baseInfo = allExercises.find((ex: any) => ex.id === minEx.i);
    
    // Provide a safe fallback if the exercise is missing from the catalog (should be caught by validator anyway)
    if (!baseInfo) {
      return {
        id: minEx.i,
        name: minEx.i.replace(/_/g, ' ').toUpperCase(),
        category: 'UNKNOWN',
        sets: minEx.s,
        reps: minEx.r,
        weight: minEx.w
      };
    }

    return {
      id: baseInfo.id,
      name: baseInfo.name,
      description: baseInfo.description,
      imageUrl: baseInfo.imageUrl,
      category: baseInfo.category || 'UNKNOWN',
      sets: minEx.s,
      reps: minEx.r,
      weight: minEx.w
    };
  });

  const hydratedFoods: ExpandedFood[] = (protocol.f || []).map(minFood => {
    const baseInfo = allFoods.find((fd: any) => fd.id === minFood.i);
    
    if (!baseInfo) {
      return {
        id: minFood.i,
        name: minFood.i.replace(/_/g, ' ').toUpperCase(),
        category: 'UNKNOWN',
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        quantity: minFood.q
      };
    }

    return {
      id: baseInfo.id,
      name: baseInfo.name,
      category: baseInfo.category || 'UNKNOWN',
      calories: baseInfo.calories || 0,
      protein: baseInfo.protein || 0,
      carbs: baseInfo.carbs || 0,
      fat: baseInfo.fat || 0,
      quantity: minFood.q
    };
  });

  return {
    name: protocol.n,
    coverImageUrl: protocol.c,
    exercises: hydratedExercises,
    foods: hydratedFoods
  };
}
