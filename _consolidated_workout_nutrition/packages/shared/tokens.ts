export const TOKEN_IDS = {
  COINCITO: 'fitlegacy-coincito-v1',
  LGCY: 'fitlegacy-lgcy-v1',
} as const;

export type TokenId = (typeof TOKEN_IDS)[keyof typeof TOKEN_IDS];

export interface TokenDefinition {
  id: TokenId;
  symbol: 'COINCITO' | '$LGCY';
  name: string;
  decimals: number;
  maxSupply: number | null;
  category: 'soft_currency' | 'hard_currency';
  isEarnable: boolean;
  isSpendable: boolean;
  icon: string;
  color: string;
  description: string;
}

export const COINCITO_PER_LGCY = 1000;
export const MIN_COINCITOS_TO_TRANSMUTE = COINCITO_PER_LGCY;

export const TOKENS: Record<TokenId, TokenDefinition> = {
  [TOKEN_IDS.COINCITO]: {
    id: TOKEN_IDS.COINCITO,
    symbol: 'COINCITO',
    name: 'Coincito',
    decimals: 0,
    maxSupply: null,
    category: 'soft_currency',
    isEarnable: true,
    isSpendable: true,
    icon: 'coin',
    color: '#D4AF37',
    description: 'Moneda blanda del ecosistema Fit Legacy.',
  },
  [TOKEN_IDS.LGCY]: {
    id: TOKEN_IDS.LGCY,
    symbol: '$LGCY',
    name: 'Legacy Token',
    decimals: 6,
    maxSupply: 21_000_000,
    category: 'hard_currency',
    isEarnable: false,
    isSpendable: true,
    icon: 'diamond',
    color: '#B8860B',
    description: 'Activo fuerte del ecosistema Fit Legacy.',
  },
};

export function coincitosToLgcy(coincitos: number): number {
  if (!Number.isFinite(coincitos) || coincitos < 0) return 0;
  return Number((Math.floor(coincitos) / COINCITO_PER_LGCY).toFixed(6));
}

export function lgcyToCoincitos(lgcy: number): number {
  if (!Number.isFinite(lgcy) || lgcy < 0) return 0;
  return Math.floor(lgcy * COINCITO_PER_LGCY);
}

export function canTransmute(coincitos: number): boolean {
  return Number.isFinite(coincitos) && Math.floor(coincitos) >= MIN_COINCITOS_TO_TRANSMUTE;
}

export function getTokenById(id: string): TokenDefinition | undefined {
  return TOKENS[id as TokenId];
}
