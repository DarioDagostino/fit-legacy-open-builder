export type BuilderRouteTab =
  | 'home'
  | 'catalog'
  | 'draft'
  | 'food'
  | 'build'
  | 'train'
  | 'oneRm'
  | 'timer'
  | 'calendar'
  | 'coach'
  | 'export';

export type BuilderMode = 'workout' | 'nutrition';

export type BuilderRoute = {
  tab: BuilderRouteTab;
  mode?: BuilderMode;
  external?: 'progress' | 'coach';
};

const ROUTE_TABLE: Record<string, BuilderRoute> = {
  '/': { tab: 'home' },
  '/build': { tab: 'build' },
  '/dashboard': { tab: 'home' },
  '/ejercicios': { tab: 'build', mode: 'workout' },
  '/ejercicios/catalogo': { tab: 'catalog', mode: 'workout' },
  '/ejercicios/borrador': { tab: 'draft', mode: 'workout' },
  '/entrenar': { tab: 'train', mode: 'workout' },
  '/1rm': { tab: 'oneRm', mode: 'workout' },
  '/timer': { tab: 'timer', mode: 'workout' },
  '/comidas': { tab: 'food', mode: 'nutrition' },
  '/comidas/catalogo': { tab: 'catalog', mode: 'nutrition' },
  '/comidas/borrador': { tab: 'draft', mode: 'nutrition' },
  '/perfil': { tab: 'home' },
  '/calendario': { tab: 'calendar' },
  '/compartir': { tab: 'export' },
  '/arsenal': { tab: 'catalog', mode: 'workout' },
  '/progreso': { tab: 'calendar', external: 'progress' },
  '/legacito': { tab: 'coach', external: 'coach' },
};

export function resolveBuilderRoute(pathname: string): BuilderRoute {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  return ROUTE_TABLE[normalized] || { tab: 'home' };
}

export function builderPathForTab(tab: BuilderRouteTab, mode: BuilderMode): string {
  switch (tab) {
    case 'catalog':
      return mode === 'nutrition' ? '/comidas/catalogo' : '/ejercicios/catalogo';
    case 'draft':
      return mode === 'nutrition' ? '/comidas/borrador' : '/ejercicios/borrador';
    case 'food':
      return '/comidas';
    case 'build':
      return '/ejercicios';
    case 'train':
      return '/entrenar';
    case 'oneRm':
      return '/1rm';
    case 'timer':
      return '/timer';
    case 'calendar':
      return '/calendario';
    case 'coach':
      return '/legacito';
    case 'export':
      return '/compartir';
    case 'home':
    default:
      return '/dashboard';
  }
}
