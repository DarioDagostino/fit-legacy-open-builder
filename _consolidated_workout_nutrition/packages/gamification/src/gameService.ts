import { calcReward, didPromote, getLevelForXp, getLeagueForXp, getStreakMultiplier, type RewardKey } from './index';

export interface GameProgressInput {
  action: RewardKey;
  currentXp: number;
  streakDays?: number;
}

export interface GameProgressResult {
  coincitos: number;
  xp: number;
  totalXp: number;
  level: number;
  leagueId: string;
  promoted: boolean;
}

export function applyGameProgress({
  action,
  currentXp,
  streakDays = 0,
}: GameProgressInput): GameProgressResult {
  const reward = calcReward(action, getStreakMultiplier(streakDays));
  const totalXp = currentXp + reward.xp;
  const league = getLeagueForXp(totalXp);

  return {
    ...reward,
    totalXp,
    level: getLevelForXp(totalXp),
    leagueId: league.id,
    promoted: didPromote(currentXp, totalXp),
  };
}
