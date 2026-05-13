/**
 * src/lib/emoji-system.ts
 * Dynamic emoji assignment based on content keywords.
 */

interface EmojiMapping {
  keywords: string[];
  emojis: string[];
}

const EMOJI_MAPPINGS: Record<string, EmojiMapping> = {
  protein: {
    keywords: ['pollo', 'pavo', 'huevo', 'salmon', 'atun', 'carne', 'res', 'cerdo', 'yogur', 'queso', 'whey', 'proteina'],
    emojis: ['🥩', '🍗', '🥚', '🐔', '🦃', '🐟', '🦐', '🧀', '🥛', '💪'],
  },
  carbs: {
    keywords: ['arroz', 'pasta', 'pan', 'batata', 'patata', 'avena', 'granola', 'maiz', 'lenteja', 'garbanzo', 'frijol'],
    emojis: ['🍚', '🍝', '🍞', '🍠', '🥔', '🌽', '🫘', '🥣', '⚡'],
  },
  fats: {
    keywords: ['aceite', 'aguacate', 'nueces', 'almendra', 'semillas', 'cacahuete', 'tahini', 'coco'],
    emojis: ['🫒', '🥑', '🌰', '🫘', '🌾', '✨', '💎'],
  },
  vegetables: {
    keywords: ['brocoli', 'espinaca', 'zanahoria', 'lechuga', 'tomate', 'pepino', 'pimiento', 'cebolla', 'ajo', 'champinon'],
    emojis: ['🥦', '🥬', '🥕', '🥒', '🍅', '🧅', '🍄', '🌶️', '🧄'],
  },
  fruits: {
    keywords: ['manzana', 'platano', 'naranja', 'fresa', 'arandano', 'sandia', 'pera', 'uva', 'kiwi'],
    emojis: ['🍎', '🍌', '🍊', '🍓', '🫐', '🍉', '🍐', '🍇', '🥝'],
  },
  chest: {
    keywords: ['press', 'pecho', 'flies', 'flexion', 'fondos'],
    emojis: ['💪', '🏋️', '⚡', '🔥', '💥'],
  },
  back: {
    keywords: ['espalda', 'remo', 'dominada', 'peso muerto', 'pull'],
    emojis: ['🔗', '⛓️', '🦴', '🪢', '🏋️'],
  },
  legs: {
    keywords: ['pierna', 'sentadilla', 'squat', 'leg', 'curl', 'extension', 'pantorrilla'],
    emojis: ['🦵', '🚴', '⚡', '💪', '🏃'],
  },
  shoulders: {
    keywords: ['hombro', 'deltoides', 'elevacion', 'press militar', 'arnold'],
    emojis: ['💎', '🏔️', '⚡', '🎯'],
  },
  arms: {
    keywords: ['brazo', 'biceps', 'triceps', 'curl', 'extension'],
    emojis: ['💪', '🔗', '⚡', '🧱'],
  },
  cardio: {
    keywords: ['cardio', 'correr', 'bicicleta', 'eliptica', 'cinta', 'hiit', 'burpees', 'mountain', 'cuerda'],
    emojis: ['🏃', '🚴', '⚡', '🔥', '💨', '🏅'],
  },
};

function seedRandom(str: string, max: number): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash) % max;
}

export function getEmoji(name: string, category?: string): string {
  const lowerName = name.toLowerCase();

  if (category) {
    const mapping = EMOJI_MAPPINGS[category];
    if (mapping && mapping.keywords.some((keyword) => lowerName.includes(keyword))) {
      const index = seedRandom(name, mapping.emojis.length);
      return mapping.emojis[index];
    }
  }

  for (const mapping of Object.values(EMOJI_MAPPINGS)) {
    if (mapping.keywords.some((keyword) => lowerName.includes(keyword))) {
      const index = seedRandom(name, mapping.emojis.length);
      return mapping.emojis[index];
    }
  }

  return '✨';
}

export function getSectionEmoji(section: string): string {
  const sectionLower = section.toLowerCase();
  const mapping = EMOJI_MAPPINGS[sectionLower];

  if (mapping && mapping.emojis.length > 0) {
    return mapping.emojis[0];
  }

  return '💪';
}

export function getCategoryEmoji(category: string): string {
  const categoryLower = category.toLowerCase();
  const mapping = EMOJI_MAPPINGS[categoryLower];

  if (mapping && mapping.emojis.length > 0) {
    return mapping.emojis[0];
  }

  return '🍽️';
}
