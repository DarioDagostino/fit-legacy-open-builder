export type PremiumImageCategory = 'heavy-duty' | 'stoic' | 'cyberpunk' | 'anatomy' | 'oversize';

export interface ImageAsset {
  id: string;
  category: PremiumImageCategory;
  tags: string[];
  path: string;
}

const ASSET_BASE_PATH = '/assets/images/oversize-premium-generated';
const BRAND_PLACEHOLDER = '/icons/fit-legacy-mark.svg';

const ASSET_NAMES = [
  'oversize-hoodie-1.webp',
  'oversize-hype-1.webp',
  'oversize-hype-2.webp',
  'oversize-hype-3.webp',
  'oversize-hype-4.webp',
  'oversize-hype-5.webp',
  'oversize-hype-6.webp',
  'oversize-hype-7.webp',
  'oversize-hype-8.webp',
  'oversize-hype-9.webp',
  'oversize-hype-10.webp',
  'oversize-hype-11.webp',
  'oversize-hype-12.webp',
  'oversize-hype-13.webp',
  'oversize-hype-14.webp',
  'oversize-hype-15.webp',
  'oversize-hype-16.webp',
  'oversize-hype-17.webp',
  'oversize-hype-18.webp',
  'oversize-hype-19.webp',
  'oversize-hype-20.webp',
  'oversize-hype-21.webp',
  'oversize-hype-22.webp',
  'oversize-hype-23.webp',
  'oversize-hype-24.webp',
  'oversize-hype-25.webp',
  'oversize-hype-26.webp',
  'oversize-hype-27.webp',
  'oversize-hype-28.webp',
  'oversize-hype-29.webp',
  'oversize-hype-30.webp',
  'oversize-hype-31.webp',
  'oversize-hype-32.webp',
  'oversize-hype-33.webp',
  'oversize-hype-34.webp',
  'oversize-hype-35.webp',
  'oversize-hype-36.webp',
  'oversize-hype-37.webp',
  'oversize-hype-38.webp',
  'oversize-hype-39.webp',
  'oversize-hype-40.webp',
  'oversize-hype-41.webp',
  'oversize-hype-42.webp',
  'oversize-hype-43.webp',
  'oversize-hype-44.webp',
  'oversize-hype-45.webp',
  'oversize-hype-46.webp',
  'oversize-hype-47.webp',
  'oversize-hype-48.webp',
  'oversize-hype-49.webp',
  'oversize-hype-50.webp',
  'oversize-hypebeast-1.webp',
  'oversize-training-1.webp',
] as const;

function normalizeToken(value: string) {
  return value.toLowerCase().trim();
}

function hashSeed(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function inferTags(name: string) {
  const tags = ['premium', 'fitness', 'noir', 'oversize'];
  if (name.includes('hoodie')) tags.push('hoodie', 'brand', 'lifestyle');
  if (name.includes('hype')) tags.push('hype', 'streetwear', 'cyberpunk');
  if (name.includes('hypebeast')) tags.push('hypebeast', 'streetwear');
  if (name.includes('training')) tags.push('training', 'heavy', 'workout');
  return tags;
}

function inferCategory(name: string): PremiumImageCategory {
  if (name.includes('training')) return 'heavy-duty';
  if (name.includes('hype')) return 'cyberpunk';
  if (name.includes('hoodie')) return 'stoic';
  return 'oversize';
}

export const LOCAL_PREMIUM_IMAGES: ImageAsset[] = ASSET_NAMES.map((name) => ({
  id: name.replace(/\.webp$/, ''),
  category: inferCategory(name),
  tags: inferTags(name),
  path: `${ASSET_BASE_PATH}/${name}`,
}));

export function getPremiumFallbackImage(category = 'oversize', tags: string[] = [], seed = ''): string {
  const normalizedCategory = normalizeToken(category) as PremiumImageCategory;
  const normalizedTags = tags.map(normalizeToken).filter(Boolean);
  const seedValue = `${normalizedCategory}:${normalizedTags.join(',')}:${seed}`;

  const tagMatches = LOCAL_PREMIUM_IMAGES.filter((image) => (
    image.category === normalizedCategory && image.tags.some((tag) => normalizedTags.includes(tag))
  ));

  const categoryMatches = LOCAL_PREMIUM_IMAGES.filter((image) => image.category === normalizedCategory);
  const fallbackPool = tagMatches.length > 0
    ? tagMatches
    : categoryMatches.length > 0
      ? categoryMatches
      : LOCAL_PREMIUM_IMAGES;

  if (fallbackPool.length === 0) return BRAND_PLACEHOLDER;
  return fallbackPool[hashSeed(seedValue) % fallbackPool.length].path;
}
