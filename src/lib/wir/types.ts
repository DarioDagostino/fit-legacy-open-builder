import { z } from 'zod';

export const WirExerciseSchema = z.object({
  i: z.string(), // ID
  s: z.number().int().min(1).max(10), // Sets
  r: z.number().int().min(1).max(100), // Reps
  w: z.number().min(0), // Weight
  m: z.string().max(100).optional(), // Message/Notes
});

export const WirFoodSchema = z.object({
  i: z.string(), // ID
  q: z.number().min(0), // Quantity
  m: z.string().max(100).optional(), // Message/Notes
});

export const WirProtocolSchema = z.object({
  v: z.literal(1), // Version
  n: z.string().min(1).max(50), // Name
  c: z.string().url().max(2048).optional().nullable(), // Cover Image URL
  e: z.array(WirExerciseSchema).max(20).optional(), // Exercises
  f: z.array(WirFoodSchema).max(15).optional(), // Foods
});

export type WirExercise = z.infer<typeof WirExerciseSchema>;
export type WirFood = z.infer<typeof WirFoodSchema>;
export type WirProtocol = z.infer<typeof WirProtocolSchema>;

// Expanded formats for hydration
export interface ExpandedExercise {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  category: string;
  sets: number;
  reps: number;
  weight: number;
  notes?: string;
}

export interface ExpandedFood {
  id: string;
  name: string;
  category: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  quantity: number;
  notes?: string;
}

export interface HydratedWirProtocol {
  name: string;
  coverImageUrl?: string | null;
  exercises: ExpandedExercise[];
  foods: ExpandedFood[];
}
