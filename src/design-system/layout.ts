// Layout System - Rental Platform Design System v1.0
// Section layouts and grid system for sharing economy marketplace

export interface GridConfig {
  columns: number
  gutter: string
  breakpoints: {
    mobile: string
    tablet: string
    desktop: string
    wide: string
  }
}

export interface SectionLayout {
  background: string
  textColor?: string
  textAlign?: string
  padding: string
  structure: string[]
}

export interface SectionLayouts {
  hero: SectionLayout
  categories: SectionLayout
  features: SectionLayout
  products: SectionLayout
}

// Grid System Configuration
export const grid: GridConfig = {
  columns: 12,
  gutter: '24px',
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1200px',
  }
}

// Section Layout Configurations
export const sections: SectionLayouts = {
  // Hero Section
  hero: {
    background: 'green-gradient-with-organic-shapes',
    textColor: 'white',
    textAlign: 'center',
    padding: '96px 0',
    structure: ['headline', 'subheadline', 'search-input', 'cta'],
  },

  // Categories Section
  categories: {
    background: 'light-gray',
    padding: '64px 0',
    structure: ['icon', 'title', 'subtitle'],
  },

  // Features Section
  features: {
    background: 'alternating-white-and-light-green',
    padding: '64px 0',
    structure: ['icon', 'title', 'description'],
  },

  // Products Section
  products: {
    background: 'white',
    padding: '64px 0',
    structure: ['image', 'title', 'rating', 'price'],
  },
}

// Grid Layout Patterns
export const gridPatterns = {
  // Categories Grid: 6→3→2 columns
  categories: {
    desktop: {
      columns: 6,
      itemsPerRow: 6,
      gap: '24px',
    },
    tablet: {
      columns: 3,
      itemsPerRow: 3,
      gap: '24px',
    },
    mobile: {
      columns: 2,
      itemsPerRow: 2,
      gap: '16px',
    },
  },

  // Features Grid: 3→2→1 columns
  features: {
    desktop: {
      columns: 3,
      itemsPerRow: 3,
      gap: '32px',
    },
    tablet: {
      columns: 2,
      itemsPerRow: 2,
      gap: '24px',
    },
    mobile: {
      columns: 1,
      itemsPerRow: 1,
      gap: '24px',
    },
  },

  // Products Grid: 4→3→2 columns
  products: {
    desktop: {
      columns: 4,
      itemsPerRow: 4,
      gap: '24px',
    },
    tablet: {
      columns: 3,
      itemsPerRow: 3,
      gap: '24px',
    },
    mobile: {
      columns: 2,
      itemsPerRow: 2,
      gap: '16px',
    },
  },
}

// Container Configurations
export const containers = {
  // Main content container
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: {
      mobile: '0 16px',
      tablet: '0 24px',
      desktop: '0 32px',
    },
  },

  // Hero container (can be wider)
  hero: {
    maxWidth: '100%',
    margin: '0 auto',
    padding: {
      mobile: '96px 16px',
      tablet: '96px 24px',
      desktop: '96px 32px',
    },
  },

  // Section container
  section: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: {
      mobile: '64px 16px',
      tablet: '64px 24px',
      desktop: '64px 32px',
    },
  },
}

// CSS Grid Utilities
export const cssGrid = {
  // Generate CSS Grid for categories
  categories: (breakpoint: 'mobile' | 'tablet' | 'desktop') => ({
    display: 'grid',
    gridTemplateColumns: `repeat(${gridPatterns.categories[breakpoint].columns}, 1fr)`,
    gap: gridPatterns.categories[breakpoint].gap,
    width: '100%',
  }),

  // Generate CSS Grid for features
  features: (breakpoint: 'mobile' | 'tablet' | 'desktop') => ({
    display: 'grid',
    gridTemplateColumns: `repeat(${gridPatterns.features[breakpoint].columns}, 1fr)`,
    gap: gridPatterns.features[breakpoint].gap,
    width: '100%',
  }),

  // Generate CSS Grid for products
  products: (breakpoint: 'mobile' | 'tablet' | 'desktop') => ({
    display: 'grid',
    gridTemplateColumns: `repeat(${gridPatterns.products[breakpoint].columns}, 1fr)`,
    gap: gridPatterns.products[breakpoint].gap,
    width: '100%',
  }),
}

// Flexbox Utilities
export const flexbox = {
  // Center content horizontally and vertically
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Space between items
  spaceBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // Column layout
  column: {
    display: 'flex',
    flexDirection: 'column',
  },

  // Row layout with gap
  rowGap: (gap: string) => ({
    display: 'flex',
    flexDirection: 'row',
    gap: gap,
    alignItems: 'center',
  }),

  // Column layout with gap
  columnGap: (gap: string) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: gap,
  }),
}

// Responsive Utilities
export const responsive = {
  // Hide on mobile
  hideMobile: {
    '@media (max-width: 767px)': {
      display: 'none',
    },
  },

  // Hide on desktop
  hideDesktop: {
    '@media (min-width: 1024px)': {
      display: 'none',
    },
  },

  // Show only on mobile
  mobileOnly: {
    '@media (min-width: 768px)': {
      display: 'none',
    },
  },

  // Show only on desktop
  desktopOnly: {
    '@media (max-width: 1023px)': {
      display: 'none',
    },
  },
}

// Layout aspect ratios
export const aspectRatios = {
  hero: '16:9',
  product: '4:3',
  square: '1:1',
  feature: '1:1',
  banner: '3:1',
}

// Z-index scale
export const zIndex = {
  background: -1,
  default: 0,
  content: 1,
  header: 10,
  overlay: 20,
  modal: 30,
  toast: 40,
  tooltip: 50,
} 