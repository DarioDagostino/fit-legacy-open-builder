/**
 * Statsig Feature Flags Configuration
 */

let StatsigInstance: any = null;

async function getStatsig() {
  if (StatsigInstance) {
    return StatsigInstance;
  }

  const mod = await import('statsig-js');
  StatsigInstance = mod.default;
  return StatsigInstance;
}

const STATSIG_CLIENT_KEY = import.meta.env.VITE_STATSIG_CLIENT_KEY || 'client-YOUR_STATSIG_KEY';

export const initStatsig = async (user?: { userID: string; email?: string }) => {
  const isDev = import.meta.env.DEV;
  const hasValidKey =
    !!STATSIG_CLIENT_KEY &&
    STATSIG_CLIENT_KEY !== 'client-YOUR_STATSIG_KEY' &&
    STATSIG_CLIENT_KEY.startsWith('client-');

  if (isDev || !hasValidKey) {
    return;
  }

  try {
    const Statsig = await getStatsig();

    if (!Statsig || typeof Statsig.initialize !== 'function') {
      console.warn('Statsig SDK not properly loaded or initialize is not a function. Feature flags will be disabled.');
      return;
    }
    
    // Check if dynamic property initialize exists on Statsig object
    const statsigAny = Statsig as any;
    if (user) {
      await statsigAny.initialize(STATSIG_CLIENT_KEY, { userID: user.userID, email: user.email });
    } else {
      await statsigAny.initialize(STATSIG_CLIENT_KEY);
    }
  } catch (err) {
    console.error('Failed to initialize Statsig:', err);
  }
};

export const isFeatureEnabled = (gateName: string): boolean => {
  if (!StatsigInstance) return false;
  return StatsigInstance.checkGate(gateName);
};

export const getDynamicConfig = (configName: string) => {
  if (!StatsigInstance) {
    return { get: (_key: string, fallback: any) => fallback };
  }
  return StatsigInstance.getConfig(configName);
};
