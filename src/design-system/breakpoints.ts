// Breakpoint System - Rental Platform Design System v1.0
// Mobile-first responsive design breakpoints for sharing economy marketplace

export interface BreakpointConfig {
  mobile: number
  tablet: number
  desktop: number
  wide: number
}

export interface MediaQueries {
  mobile: string
  tablet: string
  desktop: string
  wide: string
  
  // Utility queries
  mobileOnly: string
  tabletOnly: string
  desktopUp: string
  tabletUp: string
}

// Breakpoint values (mobile-first approach)
export const breakpoints: BreakpointConfig = {
  mobile: 320,           // Mobile devices
  tablet: 768,           // Tablets
  desktop: 1024,         // Desktop
  wide: 1200,           // Wide screens
}

// Media queries for CSS (mobile-first)
export const mediaQueries: MediaQueries = {
  mobile: `(max-width: ${breakpoints.tablet - 1}px)`,
  tablet: `(min-width: ${breakpoints.tablet}px) and (max-width: ${breakpoints.desktop - 1}px)`,
  desktop: `(min-width: ${breakpoints.desktop}px) and (max-width: ${breakpoints.wide - 1}px)`,
  wide: `(min-width: ${breakpoints.wide}px)`,
  
  // Utility queries
  mobileOnly: `(max-width: ${breakpoints.tablet - 1}px)`,
  tabletOnly: `(min-width: ${breakpoints.tablet}px) and (max-width: ${breakpoints.desktop - 1}px)`,
  desktopUp: `(min-width: ${breakpoints.desktop}px)`,
  tabletUp: `(min-width: ${breakpoints.tablet}px)`,
}

// Utility functions
export const getBreakpoint = (name: keyof BreakpointConfig): number => {
  return breakpoints[name]
}

export const getMediaQuery = (name: keyof MediaQueries): string => {
  return mediaQueries[name]
}

// Check if current screen size matches breakpoint (for client-side)
export const isBreakpoint = (breakpointName: keyof BreakpointConfig, currentWidth: number): boolean => {
  switch (breakpointName) {
    case 'mobile':
      return currentWidth < breakpoints.tablet
    case 'tablet':
      return currentWidth >= breakpoints.tablet && currentWidth < breakpoints.desktop
    case 'desktop':
      return currentWidth >= breakpoints.desktop && currentWidth < breakpoints.wide
    case 'wide':
      return currentWidth >= breakpoints.wide
    default:
      return false
  }
}

// Get current breakpoint name based on width
export const getCurrentBreakpoint = (width: number): keyof BreakpointConfig => {
  if (width < breakpoints.tablet) return 'mobile'
  if (width < breakpoints.desktop) return 'tablet'
  if (width < breakpoints.wide) return 'desktop'
  return 'wide'
}

// CSS Custom Properties for web
export const generateBreakpointVariables = (): Record<string, string> => {
  const cssVars: Record<string, string> = {}
  
  Object.entries(breakpoints).forEach(([key, value]) => {
    cssVars[`--breakpoint-${key}`] = `${value}px`
  })
  
  return cssVars
}

// Tailwind breakpoint configuration
export const tailwindBreakpoints = {
  'sm': `${breakpoints.mobile}px`,    // 320px
  'md': `${breakpoints.tablet}px`,    // 768px
  'lg': `${breakpoints.desktop}px`,   // 1024px
  'xl': `${breakpoints.wide}px`,      // 1200px
  '2xl': '1536px',                    // Extra wide (Tailwind default)
}

// Container max-widths for different breakpoints
export const containerSizes = {
  mobile: '100%',
  tablet: '720px',
  desktop: '960px',
  wide: '1200px',     // Updated to match design spec
}

// Grid system configuration - Rental Platform Design System
export const gridConfig = {
  columns: 12,
  gutter: 24,         // 24px gutter as per spec
  margins: {
    mobile: 16,
    tablet: 24,
    desktop: 32,
  },
  // Common grid collapse patterns
  collapsePatterns: {
    categories: {
      desktop: 6,     // 6 columns on desktop
      tablet: 3,      // 3 columns on tablet
      mobile: 2,      // 2 columns on mobile
    },
    features: {
      desktop: 3,     // 3-column grid
      tablet: 2,      // 2 columns on tablet
      mobile: 1,      // 1 column on mobile
    },
    products: {
      desktop: 4,     // 4-column grid
      tablet: 3,      // 3 columns on tablet
      mobile: 2,      // 2 columns on mobile
    }
  }
} 