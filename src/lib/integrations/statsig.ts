/**
 * Statsig Feature Flags Configuration
 */
import Statsig from 'statsig-js';

const STATSIG_CLIENT_KEY = import.meta.env.VITE_STATSIG_CLIENT_KEY || 'client-YOUR_STATSIG_KEY';

export const initStatsig = async (user?: { userID: string; email?: string }) => {
  try {
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
  return Statsig.checkGate(gateName);
};

export const getDynamicConfig = (configName: string) => {
  return Statsig.getConfig(configName);
};
