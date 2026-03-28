export const colors = {
  primary: '#1E3A8A', // Deep academic blue
  primaryLight: '#EFF6FF', // Very light blue for backgrounds
  secondary: '#F59E0B', // Amber/Yellow for accents/progress
  secondaryLight: '#FEF3C7',
  background: '#F8FAFC', // Slate 50 - clean app background
  card: '#FFFFFF',
  text: '#0F172A', // Slate 900 - almost black
  textLight: '#64748B', // Slate 500 - elegant gray
  success: '#10B981', // Emerald 500
  warning: '#F59E0B',
  danger: '#EF4444', // Red 500
  border: '#E2E8F0', // Slate 200
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
