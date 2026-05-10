/**
 * @fit-legacy/shared
 * Catálogos maestros UNIFIED de ejercicios y alimentos
 * Fuente única de verdad para IDs en formato .wir
 */

// ─────────────────────────────────────────────────────────────────────────────
// EXERCICIO STRUCTURE
// ─────────────────────────────────────────────────────────────────────────────

export interface Exercise {
  id: string;
  name: string;
  section: 'chest' | 'back' | 'legs' | 'shoulders' | 'arms' | 'core' | 'cardio';
  muscleGroup?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  icon?: string;
}

export interface ExerciseCategory {
  category: string;
  exercises: Exercise[];
}

// ─────────────────────────────────────────────────────────────────────────────
// PECHO (Chest)
// ─────────────────────────────────────────────────────────────────────────────

const CHEST_PRESS: ExerciseCategory = {
  category: 'Press',
  exercises: [
    { id: 'press_banca', name: 'Press Banca Plano', section: 'chest', difficulty: 'beginner' },
    { id: 'press_inclinado', name: 'Press Banca Inclinado', section: 'chest', difficulty: 'beginner' },
    { id: 'press_declinado', name: 'Press Banca Declinado', section: 'chest', difficulty: 'intermediate' },
    { id: 'press_mancuerna', name: 'Press Mancuerna Plano', section: 'chest', difficulty: 'beginner' },
    { id: 'press_mancuerna_inclinado', name: 'Press Mancuerna Inclinado', section: 'chest', difficulty: 'beginner' },
  ]
};

const CHEST_FLIES: ExerciseCategory = {
  category: 'Flies',
  exercises: [
    { id: 'flies_pecho', name: 'Flies Máquina Pecho', section: 'chest', difficulty: 'beginner' },
    { id: 'flies_mancuerna', name: 'Flies Mancuerna', section: 'chest', difficulty: 'intermediate' },
    { id: 'peck_deck', name: 'Peck Deck Machine', section: 'chest', difficulty: 'beginner' },
  ]
};

const CHEST_BODYWEIGHT: ExerciseCategory = {
  category: 'Calistenia',
  exercises: [
    { id: 'flexiones', name: 'Flexiones', section: 'chest', difficulty: 'beginner' },
    { id: 'flexiones_inclinadas', name: 'Flexiones Inclinadas', section: 'chest', difficulty: 'beginner' },
    { id: 'flexiones_diamante', name: 'Flexiones Diamante', section: 'chest', difficulty: 'advanced' },
    { id: 'fondos_pecho', name: 'Fondos Pecho', section: 'chest', difficulty: 'intermediate' },
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// ESPALDA (Back)
// ─────────────────────────────────────────────────────────────────────────────

const BACK_PULL: ExerciseCategory = {
  category: 'Tirones',
  exercises: [
    { id: 'peso_muerto', name: 'Peso Muerto Convencional', section: 'back', difficulty: 'advanced' },
    { id: 'peso_muerto_sumo', name: 'Peso Muerto Sumo', section: 'back', difficulty: 'advanced' },
    { id: 'dominadas', name: 'Dominadas', section: 'back', difficulty: 'intermediate' },
    { id: 'dominadas_agarre_ancho', name: 'Dominadas Agarre Ancho', section: 'back', difficulty: 'intermediate' },
    { id: 'poleas_dorsales', name: 'Poleas Dorsales', section: 'back', difficulty: 'beginner' },
    { id: 'remo_barra', name: 'Remo con Barra', section: 'back', difficulty: 'intermediate' },
    { id: 'remo_mancuerna', name: 'Remo Mancuerna', section: 'back', difficulty: 'intermediate' },
    { id: 'remo_maquina', name: 'Remo Máquina', section: 'back', difficulty: 'beginner' },
  ]
};

const BACK_PULL_LOW: ExerciseCategory = {
  category: 'Tirones Bajos',
  exercises: [
    { id: 'remo_bajo_cable', name: 'Remo Bajo Cable', section: 'back', difficulty: 'beginner' },
    { id: 'remo_bajo_maquina', name: 'Remo Bajo Máquina', section: 'back', difficulty: 'beginner' },
  ]
};

const BACK_BODYWEIGHT: ExerciseCategory = {
  category: 'Calistenia',
  exercises: [
    { id: 'dominadas_peso_corporal', name: 'Dominadas Peso Corporal', section: 'back', difficulty: 'intermediate' },
    { id: 'Australian_pullups', name: 'Australian Pullups', section: 'back', difficulty: 'beginner' },
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// PIERNAS (Legs)
// ─────────────────────────────────────────────────────────────────────────────

const LEGS_SQUAT: ExerciseCategory = {
  category: 'Sentadillas',
  exercises: [
    { id: 'sentadilla', name: 'Sentadilla con Barra', section: 'legs', difficulty: 'intermediate' },
    { id: 'sentadilla_frente', name: 'Sentadilla Frontal', section: 'legs', difficulty: 'advanced' },
    { id: 'sentadilla_mancuerna', name: 'Sentadilla Mancuerna', section: 'legs', difficulty: 'beginner' },
    { id: 'sentadilla_goblet', name: 'Goblet Squat', section: 'legs', difficulty: 'beginner' },
    { id: 'sentadilla_maquina', name: 'Sentadilla en Máquina', section: 'legs', difficulty: 'beginner' },
  ]
};

const LEGS_HINGE: ExerciseCategory = {
  category: 'Peso Muerto / Bisagra',
  exercises: [
    { id: 'peso_muerto_rumano', name: 'Peso Muerto Rumano', section: 'legs', difficulty: 'intermediate' },
    { id: 'buenos_dias', name: 'Buenos Días', section: 'legs', difficulty: 'advanced' },
  ]
};

const LEGS_QUADS: ExerciseCategory = {
  category: 'Cuádriceps',
  exercises: [
    { id: 'extensiones_pierna', name: 'Extensiones de Pierna', section: 'legs', difficulty: 'beginner' },
    { id: 'leg_press', name: 'Leg Press', section: 'legs', difficulty: 'beginner' },
    { id: 'prensa_45', name: 'Prensa 45°', section: 'legs', difficulty: 'beginner' },
  ]
};

const LEGS_HAMSTRING: ExerciseCategory = {
  category: 'Isquiotibiales',
  exercises: [
    { id: 'curl_pierna_acostado', name: 'Curl Pierna Acostado', section: 'legs', difficulty: 'beginner' },
    { id: 'curl_pierna_sentado', name: 'Curl Pierna Sentado', section: 'legs', difficulty: 'beginner' },
    { id: 'curl_nórdico', name: 'Curl Nórdico', section: 'legs', difficulty: 'advanced' },
  ]
};

const LEGS_CALVES: ExerciseCategory = {
  category: 'Pantorrillas',
  exercises: [
    { id: 'elevaciones_talones', name: 'Elevaciones de Talones', section: 'legs', difficulty: 'beginner' },
    { id: 'elevaciones_sentado', name: 'Elevaciones Talones Sentado', section: 'legs', difficulty: 'beginner' },
  ]
};

const LEGS_BODYWEIGHT: ExerciseCategory = {
  category: 'Calistenia',
  exercises: [
    { id: 'sentadilla_peso_corporal', name: 'Sentadilla Peso Corporal', section: 'legs', difficulty: 'beginner' },
    { id: 'estocadas', name: 'Estocadas', section: 'legs', difficulty: 'beginner' },
    { id: 'pistol_squat', name: 'Pistol Squat', section: 'legs', difficulty: 'advanced' },
    { id: 'saltos', name: 'Saltos', section: 'legs', difficulty: 'intermediate' },
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// HOMBROS (Shoulders)
// ─────────────────────────────────────────────────────────────────────────────

const SHOULDERS_PRESS: ExerciseCategory = {
  category: 'Press Hombros',
  exercises: [
    { id: 'press_militar', name: 'Press Militar', section: 'shoulders', difficulty: 'intermediate' },
    { id: 'press_mancuerna', name: 'Press Mancuerna Hombro', section: 'shoulders', difficulty: 'beginner' },
    { id: 'press_maquina', name: 'Press Máquina Hombro', section: 'shoulders', difficulty: 'beginner' },
    { id: 'arnold_press', name: 'Arnold Press', section: 'shoulders', difficulty: 'intermediate' },
  ]
};

const SHOULDERS_LATERAL: ExerciseCategory = {
  category: 'Elevaciones Laterales',
  exercises: [
    { id: 'elevaciones_laterales', name: 'Elevaciones Laterales Mancuerna', section: 'shoulders', difficulty: 'beginner' },
    { id: 'elevaciones_laterales_cable', name: 'Elevaciones Laterales Cable', section: 'shoulders', difficulty: 'beginner' },
    { id: 'elevaciones_laterales_maquina', name: 'Elevaciones Laterales Máquina', section: 'shoulders', difficulty: 'beginner' },
  ]
};

const SHOULDERS_REAR: ExerciseCategory = {
  category: 'Deltoides Posterior',
  exercises: [
    { id: 'flies_posterior', name: 'Flies Posterior', section: 'shoulders', difficulty: 'beginner' },
    { id: 'remo_vertical', name: 'Remo Vertical', section: 'shoulders', difficulty: 'intermediate' },
    { id: 'reverse_peck_deck', name: 'Reverse Peck Deck', section: 'shoulders', difficulty: 'beginner' },
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// BRAZOS (Arms)
// ─────────────────────────────────────────────────────────────────────────────

const ARMS_BICEPS: ExerciseCategory = {
  category: 'Bíceps',
  exercises: [
    { id: 'curl_barra', name: 'Curl Barra Z', section: 'arms', difficulty: 'beginner' },
    { id: 'curl_mancuerna', name: 'Curl Mancuerna', section: 'arms', difficulty: 'beginner' },
    { id: 'curl_cable', name: 'Curl Cable', section: 'arms', difficulty: 'beginner' },
    { id: 'curl_martillo', name: 'Curl Martillo', section: 'arms', difficulty: 'beginner' },
    { id: 'curl_predicador', name: 'Curl Predicador', section: 'arms', difficulty: 'beginner' },
    { id: 'curl_sentado_inclinado', name: 'Curl Sentado Inclinado', section: 'arms', difficulty: 'intermediate' },
  ]
};

const ARMS_TRICEPS: ExerciseCategory = {
  category: 'Tríceps',
  exercises: [
    { id: 'fondos', name: 'Fondos en Paralelas', section: 'arms', difficulty: 'intermediate' },
    { id: 'fondos_banco', name: 'Fondos en Banco', section: 'arms', difficulty: 'beginner' },
    { id: 'extension_triceps', name: 'Extensión Tríceps Polea', section: 'arms', difficulty: 'beginner' },
    { id: 'extension_triceps_mancuerna', name: 'Extensión Tríceps Mancuerna', section: 'arms', difficulty: 'beginner' },
    { id: 'presion_banco_apretado', name: 'Press Banca Agarre Apretado', section: 'arms', difficulty: 'intermediate' },
    { id: 'kickback_triceps', name: 'Kickback Tríceps', section: 'arms', difficulty: 'beginner' },
  ]
};

const ARMS_FOREARMS: ExerciseCategory = {
  category: 'Antebrazos',
  exercises: [
    { id: 'curl_muñeca', name: 'Curl Muñeca', section: 'arms', difficulty: 'beginner' },
    { id: 'extension_muñeca', name: 'Extensión Muñeca', section: 'arms', difficulty: 'beginner' },
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// CORE
// ─────────────────────────────────────────────────────────────────────────────

const CORE_ABS: ExerciseCategory = {
  category: 'Abdominales',
  exercises: [
    { id: 'crunches', name: 'Crunches', section: 'core', difficulty: 'beginner' },
    { id: 'crunches_maquina', name: 'Crunches Máquina', section: 'core', difficulty: 'beginner' },
    { id: 'flexiones_cable', name: 'Flexión de Cable', section: 'core', difficulty: 'beginner' },
    { id: 'abdominales_rueda', name: 'Abdominales Rueda', section: 'core', difficulty: 'advanced' },
    { id: 'hanging_leg_raise', name: 'Hanging Leg Raise', section: 'core', difficulty: 'intermediate' },
    { id: 'candelabro', name: 'Candelabro', section: 'core', difficulty: 'advanced' },
  ]
};

const CORE_PLANK: ExerciseCategory = {
  category: 'Planchas',
  exercises: [
    { id: 'plancha_frente', name: 'Plancha Frontal', section: 'core', difficulty: 'beginner' },
    { id: 'plancha_lateral', name: 'Plancha Lateral', section: 'core', difficulty: 'beginner' },
    { id: 'plancha_rotacion', name: 'Plancha con Rotación', section: 'core', difficulty: 'intermediate' },
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// CARDIO
// ─────────────────────────────────────────────────────────────────────────────

const CARDIO: ExerciseCategory = {
  category: 'Cardio',
  exercises: [
    { id: 'cinta_correr', name: 'Cinta de Correr', section: 'cardio', difficulty: 'beginner' },
    { id: 'bicicleta_fija', name: 'Bicicleta Fija', section: 'cardio', difficulty: 'beginner' },
    { id: 'eliptica', name: 'Elíptica', section: 'cardio', difficulty: 'beginner' },
    { id: 'remo_maquina', name: 'Máquina de Remo', section: 'cardio', difficulty: 'beginner' },
    { id: 'escalera', name: 'Máquina Escalera', section: 'cardio', difficulty: 'intermediate' },
    { id: 'saltar_cuerda', name: 'Saltar Cuerda', section: 'cardio', difficulty: 'beginner' },
    { id: 'burpees', name: 'Burpees', section: 'cardio', difficulty: 'intermediate' },
    { id: 'mountain_climbers', name: 'Mountain Climbers', section: 'cardio', difficulty: 'beginner' },
    { id: 'HIIT', name: 'HIIT Genérico', section: 'cardio', difficulty: 'advanced' },
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// UNIFIED_EXERCISES EXPORT
// ─────────────────────────────────────────────────────────────────────────────

export const UNIFIED_EXERCISES = {
  chest: [CHEST_PRESS, CHEST_FLIES, CHEST_BODYWEIGHT],
  back: [BACK_PULL, BACK_PULL_LOW, BACK_BODYWEIGHT],
  legs: [LEGS_SQUAT, LEGS_HINGE, LEGS_QUADS, LEGS_HAMSTRING, LEGS_CALVES, LEGS_BODYWEIGHT],
  shoulders: [SHOULDERS_PRESS, SHOULDERS_LATERAL, SHOULDERS_REAR],
  arms: [ARMS_BICEPS, ARMS_TRICEPS, ARMS_FOREARMS],
  core: [CORE_ABS, CORE_PLANK],
  cardio: [CARDIO],
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// FOOD STRUCTURE
// ─────────────────────────────────────────────────────────────────────────────

export interface Food {
  id: string;
  name: string;
  protein: number;     // grams per 100g
  carbs: number;       // grams per 100g
  fats: number;        // grams per 100g
  calories: number;    // kcal per 100g
  category: 'protein' | 'carbs' | 'fats' | 'vegetables' | 'fruits';
}

// ─────────────────────────────────────────────────────────────────────────────
// PROTEINS
// ─────────────────────────────────────────────────────────────────────────────

const PROTEIN_SOURCES: Food[] = [
  { id: 'pollo', name: 'Pechuga de Pollo', protein: 31, carbs: 0, fats: 3.6, calories: 165, category: 'protein' },
  { id: 'pavo', name: 'Pechuga de Pavo', protein: 29, carbs: 0, fats: 1, calories: 135, category: 'protein' },
  { id: 'huevo', name: 'Huevo Entero', protein: 13, carbs: 1.1, fats: 11, calories: 155, category: 'protein' },
  { id: 'clara_huevo', name: 'Clara de Huevo', protein: 10, carbs: 0.7, fats: 0.17, calories: 52, category: 'protein' },
  { id: 'salmon', name: 'Salmón', protein: 20, carbs: 0, fats: 13, calories: 208, category: 'protein' },
  { id: 'atun', name: 'Atún Enlatado', protein: 29, carbs: 0, fats: 0.7, calories: 132, category: 'protein' },
  { id: 'carne_res', name: 'Carne de Res (magra)', protein: 26, carbs: 0, fats: 5, calories: 165, category: 'protein' },
  { id: 'carne_cerdo', name: 'Carne de Cerdo (magra)', protein: 27, carbs: 0, fats: 4.7, calories: 165, category: 'protein' },
  { id: 'queso_cottage', name: 'Queso Cottage', protein: 11, carbs: 3.4, fats: 4.3, calories: 98, category: 'protein' },
  { id: 'yogur_griego', name: 'Yogur Griego', protein: 10, carbs: 3.3, fats: 5, calories: 100, category: 'protein' },
  { id: 'leche', name: 'Leche Descremada', protein: 3.2, carbs: 4.8, fats: 0.1, calories: 35, category: 'protein' },
  { id: 'proteina_whey', name: 'Proteína Whey Polvo', protein: 80, carbs: 5, fats: 2, calories: 373, category: 'protein' },
];

// ─────────────────────────────────────────────────────────────────────────────
// CARBS
// ─────────────────────────────────────────────────────────────────────────────

const CARB_SOURCES: Food[] = [
  { id: 'arroz', name: 'Arroz Blanco', protein: 2.7, carbs: 28, fats: 0.3, calories: 130, category: 'carbs' },
  { id: 'arroz_integral', name: 'Arroz Integral', protein: 2.6, carbs: 24.7, fats: 0.9, calories: 112, category: 'carbs' },
  { id: 'pasta', name: 'Pasta Cocida', protein: 1.8, carbs: 14.4, fats: 0.1, calories: 64, category: 'carbs' },
  { id: 'pan_integral', name: 'Pan Integral', protein: 4, carbs: 49, fats: 1.5, calories: 247, category: 'carbs' },
  { id: 'batata', name: 'Batata Cocida', protein: 1.6, carbs: 21, fats: 0.1, calories: 86, category: 'carbs' },
  { id: 'patata', name: 'Patata Hervida', protein: 1.7, carbs: 17, fats: 0.1, calories: 77, category: 'carbs' },
  { id: 'avena', name: 'Avena Cruda', protein: 16, carbs: 54, fats: 6.9, calories: 389, category: 'carbs' },
  { id: 'granola', name: 'Granola', protein: 9, carbs: 69, fats: 12, calories: 471, category: 'carbs' },
  { id: 'maiz', name: 'Maíz Cocido', protein: 3.4, carbs: 19, fats: 1.5, calories: 96, category: 'carbs' },
  { id: 'lentejas', name: 'Lentejas Cocidas', protein: 9, carbs: 20, fats: 0.4, calories: 116, category: 'carbs' },
  { id: 'garbanzos', name: 'Garbanzos Cocidos', protein: 8.9, carbs: 27, fats: 2.6, calories: 164, category: 'carbs' },
  { id: 'frijoles', name: 'Frijoles Cocidos', protein: 8.7, carbs: 24, fats: 0.4, calories: 127, category: 'carbs' },
];

// ─────────────────────────────────────────────────────────────────────────────
// FATS
// ─────────────────────────────────────────────────────────────────────────────

const FAT_SOURCES: Food[] = [
  { id: 'aceite_oliva', name: 'Aceite de Oliva', protein: 0, carbs: 0, fats: 100, calories: 884, category: 'fats' },
  { id: 'aguacate', name: 'Aguacate', protein: 2, carbs: 9, fats: 15, calories: 160, category: 'fats' },
  { id: 'nueces', name: 'Nueces', protein: 8.7, carbs: 7.7, fats: 65.2, calories: 654, category: 'fats' },
  { id: 'almendras', name: 'Almendras', protein: 21.2, carbs: 21.6, fats: 49.9, calories: 579, category: 'fats' },
  { id: 'semillas_girasol', name: 'Semillas de Girasol', protein: 8.5, carbs: 20, fats: 51.5, calories: 584, category: 'fats' },
  { id: 'mantequilla_cacahuete', name: 'Mantequilla de Cacahuete', protein: 25.8, carbs: 20, fats: 50.4, calories: 588, category: 'fats' },
  { id: 'tahini', name: 'Tahini', protein: 17.7, carbs: 21.3, fats: 53.1, calories: 595, category: 'fats' },
  { id: 'coco_rallado', name: 'Coco Rallado', protein: 3.3, carbs: 9.4, fats: 35.3, calories: 354, category: 'fats' },
];

// ─────────────────────────────────────────────────────────────────────────────
// VEGETABLES
// ─────────────────────────────────────────────────────────────────────────────

const VEGETABLES: Food[] = [
  { id: 'brocoli', name: 'Brócoli Cocido', protein: 2.8, carbs: 7.2, fats: 0.4, calories: 43, category: 'vegetables' },
  { id: 'espinaca', name: 'Espinaca Cruda', protein: 2.7, carbs: 3.6, fats: 0.4, calories: 23, category: 'vegetables' },
  { id: 'zanahoria', name: 'Zanahoria Cruda', protein: 0.9, carbs: 10.2, fats: 0.2, calories: 41, category: 'vegetables' },
  { id: 'lechuga', name: 'Lechuga Iceberg', protein: 0.9, carbs: 2.9, fats: 0.1, calories: 15, category: 'vegetables' },
  { id: 'tomate', name: 'Tomate Crudo', protein: 0.9, carbs: 3.9, fats: 0.2, calories: 18, category: 'vegetables' },
  { id: 'pepino', name: 'Pepino', protein: 0.7, carbs: 3.6, fats: 0.1, calories: 16, category: 'vegetables' },
  { id: 'pimiento', name: 'Pimiento Rojo', protein: 0.9, carbs: 9.2, fats: 0.3, calories: 37, category: 'vegetables' },
  { id: 'cebolla', name: 'Cebolla Cruda', protein: 1.1, carbs: 9.3, fats: 0.1, calories: 40, category: 'vegetables' },
  { id: 'ajo', name: 'Ajo', protein: 6.6, carbs: 33, fats: 0.5, calories: 149, category: 'vegetables' },
  { id: 'champiñones', name: 'Champiñones', protein: 3.3, carbs: 3.3, fats: 0.3, calories: 22, category: 'vegetables' },
];

// ─────────────────────────────────────────────────────────────────────────────
// FRUITS
// ─────────────────────────────────────────────────────────────────────────────

const FRUITS: Food[] = [
  { id: 'manzana', name: 'Manzana', protein: 0.3, carbs: 25.1, fats: 0.2, calories: 95, category: 'fruits' },
  { id: 'platano', name: 'Plátano', protein: 1.1, carbs: 27, fats: 0.3, calories: 105, category: 'fruits' },
  { id: 'naranja', name: 'Naranja', protein: 0.7, carbs: 12, fats: 0.1, calories: 47, category: 'fruits' },
  { id: 'fresa', name: 'Fresas', protein: 0.7, carbs: 7.7, fats: 0.3, calories: 32, category: 'fruits' },
  { id: 'arandanos', name: 'Arándanos', protein: 0.7, carbs: 21.5, fats: 0.3, calories: 84, category: 'fruits' },
  { id: 'sandia', name: 'Sandía', protein: 0.6, carbs: 11.6, fats: 0.2, calories: 44, category: 'fruits' },
  { id: 'pera', name: 'Pera', protein: 0.4, carbs: 15.2, fats: 0.1, calories: 57, category: 'fruits' },
  { id: 'uvas', name: 'Uvas', protein: 0.6, carbs: 18.2, fats: 0.2, calories: 67, category: 'fruits' },
  { id: 'kiwi', name: 'Kiwi', protein: 0.8, carbs: 14.7, fats: 0.5, calories: 61, category: 'fruits' },
];

// ─────────────────────────────────────────────────────────────────────────────
// UNIFIED_FOODS EXPORT
// ─────────────────────────────────────────────────────────────────────────────

export const UNIFIED_FOODS = {
  protein: PROTEIN_SOURCES,
  carbs: CARB_SOURCES,
  fats: FAT_SOURCES,
  vegetables: VEGETABLES,
  fruits: FRUITS,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// HELPER FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Obtiene un ejercicio por ID
 */
export function getExerciseById(id: string): Exercise | undefined {
  for (const section of Object.values(UNIFIED_EXERCISES)) {
    for (const category of section) {
      const exercise = category.exercises.find(ex => ex.id === id);
      if (exercise) return exercise;
    }
  }
  return undefined;
}

/**
 * Obtiene un alimento por ID
 */
export function getFoodById(id: string): Food | undefined {
  for (const foods of Object.values(UNIFIED_FOODS)) {
    const food = foods.find(f => f.id === id);
    if (food) return food;
  }
  return undefined;
}

/**
 * Valida que un ejercicio existe
 */
export function hasExercise(id: string): boolean {
  return getExerciseById(id) !== undefined;
}

/**
 * Valida que un alimento existe
 */
export function hasFood(id: string): boolean {
  return getFoodById(id) !== undefined;
}
