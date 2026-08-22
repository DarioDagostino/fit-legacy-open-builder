// App assets live in Supabase Storage (public bucket) so they are always
// available regardless of the deploy state.
export const ASSET_BASE_URL = 'https://fsoevzostulbtoxcqqdh.supabase.co/storage/v1/object/public/builder-assets';

export const assetUrl = (path: string) => `${ASSET_BASE_URL}${path}`;

export const localAssetUrl = (path: string) => {
  const normalizedPath = path.replace(/^\/+/, '');
  return `${import.meta.env.BASE_URL}${normalizedPath}`;
};
