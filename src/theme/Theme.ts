export const colors = {
  primary: '#4693e5', // The user's new favorite Blue
  primaryLight: '#E0EEFF', // Light version for subtle backgrounds
  secondary: '#4693e5',
  secondaryLight: '#E0EEFF',
  background: '#F8FAFC', // Keep background clean slate or use a light tint
  card: '#FFFFFF',
  text: '#0F172A', // Slate 900
  textLight: '#94A3B8', // Slate 400
  textMuted: '#64748B', // Slate 500
  success: '#059669', // Emerald 600
  successLight: '#D1FAE5',
  warning: '#D97706', // Amber 600
  warningLight: '#FEF3C7',
  danger: '#DC2626', // Red 600
  dangerLight: '#FEE2E2',
  border: '#F1F5F9',
  white: '#FFFFFF',
  black: '#000000',
};

export const spacing = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 40,
};

export const radius = {
  s: 6,
  m: 10,
  l: 16,
  xl: 20,
  round: 999,
};

export const typography = {
  h1: {
    fontSize: 28,
    fontWeight: '800' as const,
    color: colors.text,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 22,
    fontWeight: '700' as const,
    color: colors.text,
    letterSpacing: -0.3,
  },
  h3: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: colors.text,
    letterSpacing: -0.2,
  },
  body: {
    fontSize: 15,
    color: colors.text,
    fontWeight: '500' as const,
  },
  bodySmall: {
    fontSize: 14,
    color: colors.textLight,
    fontWeight: '400' as const,
  },
  caption: {
    fontSize: 12,
    color: colors.textLight,
    fontWeight: '500' as const,
  },
};
