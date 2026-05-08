import { UNIFIED_EXERCISES, UNIFIED_FOODS } from '@fit-legacy/shared';
import { WirProtocol, WirProtocolSchema } from './types';

export function validateWir(data: unknown): { valid: boolean; data?: WirProtocol; errors: string[] } {
  const result = WirProtocolSchema.safeParse(data);
  
  if (!result.success) {
    return {
      valid: false,
      errors: result.error.errors.map(e => `${e.path.join('.')}: ${e.message}`)
    };
  }

  const protocol = result.data;
  const errors: string[] = [];

  const allExercises = Object.values(UNIFIED_EXERCISES).flatMap(s => s.flatMap((g: any) => g.exercises));
  const allFoods = Object.values(UNIFIED_FOODS).flat() as any[];

  (protocol.e || []).forEach(e => {
    if (!allExercises.find((ex: any) => ex.id === e.i)) {
      errors.push(`ID de ejercicio desconocido: ${e.i}`);
    }
  });

  (protocol.f || []).forEach(f => {
    if (!allFoods.find((fd: any) => fd.id === f.i)) {
      errors.push(`ID de alimento desconocido: ${f.i}`);
    }
  });

  return {
    valid: errors.length === 0,
    data: protocol,
    errors
  };
}
