import { SURFACE_ACTIONS, type AppSurface, type RewardKey } from './index';

export function getAvailableActions(surface: AppSurface): RewardKey[] {
  return SURFACE_ACTIONS[surface] ?? [];
}

export function canAwardAction(surface: AppSurface, action: RewardKey): boolean {
  return getAvailableActions(surface).includes(action);
}
