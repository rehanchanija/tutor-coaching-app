export const colors = {
  primary: '#4361EE',
  primaryLight: '#4361EE20',
  secondary: '#3F3D56',
  background: '#F8F9FA',
  card: '#FFFFFF',
  text: '#2B2D42',
  textLight: '#8D99AE',
  success: '#4CAF50',
  warning: '#FF9800',
  border: '#E2E8F0',
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
  s: 8,
  m: 12,
  l: 16,
  xl: 24,
  round: 999,
};

export const typography = {
  h1: { fontSize: 28, fontWeight: '700' as const, color: colors.text },
  h2: { fontSize: 24, fontWeight: '600' as const, color: colors.text },
  h3: { fontSize: 18, fontWeight: '600' as const, color: colors.text },
  body: { fontSize: 16, color: colors.text },
  bodySmall: { fontSize: 14, color: colors.textLight },
  caption: { fontSize: 12, color: colors.textLight },
};
