// Patterns System - Rental Platform Design System v1.0
// Reusable design patterns for sharing economy marketplace

export interface SearchInputPattern {
  style: string
  background: string
  placeholder: string
  button: {
    background: string
    style: string
  }
  width: {
    mobile: string
    desktop: string
  }
  borderRadius: string
  padding: string
}

export interface RatingPattern {
  display: string
  starColor: string
  textColor: string
  fontSize: string
  iconSize: string
}

export interface PricingPattern {
  format: string
  color: string
  fontWeight: string
  fontSize: string
  position: string
}

export interface StepsPattern {
  layout: string
  numbering: {
    style: string
    background: string
    color: string
    size: string
  }
  connection: {
    style: string
    color: string
  }
  iconStyle: string
}

export interface AnimationPattern {
  hover: {
    scale: string
    shadow: string
    duration: string
  }
  transitions: {
    duration: string
    timing: string
  }
  loading: {
    type: string
    color: string
  }
  microInteractions: {
    buttons: string
    forms: string
  }
}

// Design Patterns Configuration
export const patterns = {
  // Search Input Pattern
  searchInput: {
    style: 'rounded-pill',
    background: '#FFFFFF',
    placeholder: 'Light gray text (#9CA3AF)',
    button: {
      background: '#44D62C', // Primary green
      style: 'pill-attached-right',
    },
    width: {
      mobile: '100%',
      desktop: 'constrained',
    },
    borderRadius: '9999px', // Full pill shape
    padding: '12px 24px',
  } as SearchInputPattern,

  // Rating Pattern
  ratings: {
    display: 'star-icons-plus-number',
    starColor: '#FFC107', // Accent yellow
    textColor: '#9CA3AF', // Tertiary text
    fontSize: '14px',
    iconSize: '16px',
  } as RatingPattern,

  // Pricing Pattern
  pricing: {
    format: 'currency-symbol-plus-amount',
    color: '#343C3E', // Primary text
    fontWeight: '600',
    fontSize: '16px',
    position: 'prominent',
  } as PricingPattern,

  // Steps Pattern
  steps: {
    layout: 'horizontal-flow',
    numbering: {
      style: 'circular-badges',
      background: '#44D62C', // Primary green
      color: '#FFFFFF',
      size: '32px',
    },
    connection: {
      style: 'dotted-lines',
      color: '#E0E0E0', // Medium gray
    },
    iconStyle: 'simple-line-icons',
  } as StepsPattern,

  // Animation Patterns
  animations: {
    hover: {
      scale: '1.02-1.05',
      shadow: 'increase',
      duration: '0.2s',
    },
    transitions: {
      duration: '0.2-0.3s',
      timing: 'ease-out',
    },
    loading: {
      type: 'skeleton-screens',
      color: '#E0E0E0',
    },
    microInteractions: {
      buttons: 'state-changes',
      forms: 'validation-feedback',
    },
  } as AnimationPattern,
}

// CSS Utilities for Patterns
export const generatePatternCSS = {
  searchInput: () => ({
    borderRadius: patterns.searchInput.borderRadius,
    backgroundColor: patterns.searchInput.background,
    padding: patterns.searchInput.padding,
    width: '100%',
    border: '1px solid #E0E0E0',
    '&:focus': {
      outline: 'none',
      borderColor: '#44D62C',
      boxShadow: '0 0 0 3px rgba(68, 214, 44, 0.1)',
    },
    '&::placeholder': {
      color: '#9CA3AF',
    },
  }),

  ratingStars: () => ({
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: patterns.ratings.fontSize,
    color: patterns.ratings.textColor,
    '.star': {
      color: patterns.ratings.starColor,
      fontSize: patterns.ratings.iconSize,
    },
  }),

  pricing: () => ({
    color: patterns.pricing.color,
    fontWeight: patterns.pricing.fontWeight,
    fontSize: patterns.pricing.fontSize,
    '.currency': {
      fontWeight: 'normal',
      marginRight: '2px',
    },
  }),

  stepIndicator: () => ({
    display: 'flex',
    alignItems: 'center',
    '.step-number': {
      width: patterns.steps.numbering.size,
      height: patterns.steps.numbering.size,
      borderRadius: '50%',
      backgroundColor: patterns.steps.numbering.background,
      color: patterns.steps.numbering.color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '600',
      fontSize: '14px',
    },
    '.step-connector': {
      width: '48px',
      height: '2px',
      backgroundColor: patterns.steps.connection.color,
      borderStyle: 'dotted',
      borderWidth: '2px 0 0 0',
      borderColor: patterns.steps.connection.color,
    },
  }),

  hoverEffect: () => ({
    transition: `all ${patterns.animations.transitions.duration} ${patterns.animations.transitions.timing}`,
    '&:hover': {
      transform: 'scale(1.02)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    },
  }),
}

// Touch target sizes for mobile accessibility
export const touchTargets = {
  minimum: '44px',
  recommended: '48px',
  small: '32px',
  large: '56px',
}

// Animation durations
export const animationDurations = {
  fast: '0.15s',
  normal: '0.2s',
  slow: '0.3s',
  loading: '1.5s',
}

// Easing functions
export const easingFunctions = {
  easeOut: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  easeIn: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
  easeInOut: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} 