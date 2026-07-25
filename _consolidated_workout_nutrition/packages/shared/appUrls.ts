export type FitLegacyAppUrls = {
  landing: string;
  road: string;
  ai: string;
  builder: string;
  analytics: string;
};

type RuntimeEnv = {
  DEV?: boolean;
  VITE_LANDING_URL?: string;
  VITE_ROAD_URL?: string;
  VITE_AI_URL?: string;
  VITE_BUILDER_URL?: string;
  VITE_ANALYTICS_URL?: string;
};

const DEFAULTS: FitLegacyAppUrls = {
  landing: 'https://fitlegacy.app',
  road: 'https://road.fitlegacy.app',
  ai: 'https://ia.fitlegacy.app',
  builder: 'https://builder.fitlegacy.app',
  analytics: 'https://analytics.fitlegacy.app',
};

const LOCAL_DEFAULTS: FitLegacyAppUrls = {
  landing: 'http://localhost:5176',
  road: 'http://localhost:5174',
  ai: 'http://localhost:5177',
  builder: 'http://localhost:5178',
  analytics: 'http://localhost:5179',
};

export const resolveFitLegacyAppUrls = (env: RuntimeEnv): FitLegacyAppUrls => {
  const isDev = Boolean(env.DEV);
  const defaults = isDev ? LOCAL_DEFAULTS : DEFAULTS;
  return {
    landing: env.VITE_LANDING_URL || defaults.landing,
    road: env.VITE_ROAD_URL || defaults.road,
    ai: env.VITE_AI_URL || defaults.ai,
    builder: env.VITE_BUILDER_URL || defaults.builder,
    analytics: env.VITE_ANALYTICS_URL || defaults.analytics,
  };
};
