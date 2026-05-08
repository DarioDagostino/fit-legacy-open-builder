import React from 'react';
import { isFeatureEnabled } from '@/lib/integrations/statsig';

interface FeatureToggleProps {
  gateName: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Conditional renderer based on Statsig Feature Gates.
 */
export const FeatureToggle: React.FC<FeatureToggleProps> = ({ gateName, children, fallback = null }) => {
  const enabled = isFeatureEnabled(gateName);

  if (!enabled) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
