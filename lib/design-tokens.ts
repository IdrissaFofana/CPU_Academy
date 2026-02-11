// Design System Tokens - CPU Formation
// Version sans dégradés

export const SPACING = {
  section: 'py-16 lg:py-24',
  container: 'py-12 lg:py-16',
  card: 'p-6 lg:p-8',
  element: 'space-y-6',
  tight: 'space-y-3',
  loose: 'space-y-8',
} as const;

export const TYPOGRAPHY = {
  h1: 'text-4xl lg:text-5xl font-bold',
  h2: 'text-3xl lg:text-4xl font-bold',
  h3: 'text-2xl lg:text-3xl font-bold',
  h4: 'text-xl lg:text-2xl font-semibold',
  body: 'text-base lg:text-lg',
  small: 'text-sm',
  tiny: 'text-xs',
  lead: 'text-xl lg:text-2xl',
} as const;

export const SHADOWS = {
  card: 'shadow-lg',
  cardHover: 'shadow-xl',
  subtle: 'shadow-sm',
  strong: 'shadow-2xl',
  glow: 'shadow-2xl shadow-cpu-orange/20',
} as const;

export const TRANSITIONS = {
  default: 'transition-all duration-300',
  slow: 'transition-all duration-500',
  fast: 'transition-all duration-150',
  spring: 'transition-all duration-300 ease-out',
} as const;

export const RADIUS = {
  card: 'rounded-xl',
  button: 'rounded-lg',
  badge: 'rounded-full',
  input: 'rounded-md',
  image: 'rounded-lg',
} as const;

// Couleurs solides (sans dégradés)
export const COLORS = {
  primary: 'bg-cpu-orange',
  primaryHover: 'hover:bg-orange-600',
  primaryText: 'text-cpu-orange',
  secondary: 'bg-cpu-green',
  secondaryHover: 'hover:bg-green-600',
  dark: 'bg-slate-900',
  darkHover: 'hover:bg-slate-800',
  light: 'bg-slate-50',
} as const;

export const RESPONSIVE = {
  container: 'container mx-auto px-4 sm:px-6 lg:px-8',
  grid2Cols: 'grid grid-cols-1 md:grid-cols-2 gap-6',
  grid3Cols: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
  grid4Cols: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6',
  sidebarLeft: 'grid grid-cols-1 lg:grid-cols-4 gap-8',
  sidebarRight: 'grid grid-cols-1 lg:grid-cols-3 gap-8',
  touchTarget: 'min-h-[44px] min-w-[44px]',
} as const;

export const ACCESSIBLE_COLORS = {
  text: {
    primary: 'text-slate-900',
    secondary: 'text-slate-700',
    tertiary: 'text-slate-600',
    muted: 'text-slate-500',
  },
  textOnDark: {
    primary: 'text-white',
    secondary: 'text-slate-100',
    tertiary: 'text-slate-200',
    muted: 'text-slate-300',
  },
  link: {
    default: 'text-cpu-orange underline underline-offset-4',
    hover: 'hover:text-cpu-orange/80',
    visited: 'text-purple-700',
  },
  focus: {
    ring: 'focus-visible:ring-2 focus-visible:ring-cpu-orange focus-visible:ring-offset-2',
    outline: 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-cpu-orange focus-visible:outline-offset-2',
  },
} as const;

