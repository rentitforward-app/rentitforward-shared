// Component System - Rental Platform Design System v1.0
// Reusable component styles and variants for sharing economy marketplace

import { ColorPalette } from './colors'
import { TextStyle } from './typography'
import { SpacingScale } from './spacing'

export interface ComponentVariant {
  default: ComponentStyle
  hover?: ComponentStyle
  active?: ComponentStyle
  disabled?: ComponentStyle
  focus?: ComponentStyle
}

export interface ComponentStyle {
  backgroundColor?: string
  borderColor?: string
  borderWidth?: number
  borderRadius?: number
  padding?: {
    x: number
    y: number
  }
  textStyle?: Partial<TextStyle>
  shadow?: string
  opacity?: number
}

export interface ButtonVariants {
  primary: ComponentVariant
  secondary: ComponentVariant
  text: ComponentVariant
  outline: ComponentVariant
}

export interface CardVariants {
  product: ComponentVariant
  feature: ComponentVariant
  default: ComponentVariant
  elevated: ComponentVariant
  outlined: ComponentVariant
}

export interface InputVariants {
  default: ComponentVariant
  filled: ComponentVariant
  outlined: ComponentVariant
}

export interface ComponentTheme {
  buttons: ButtonVariants
  cards: CardVariants
  inputs: InputVariants
  navigation: {
    header: ComponentStyle
  }
  icons: {
    size: number
    color: string
    style: string
  }
  loadingIndicator: {
    color: string
    size: number
    strokeWidth?: number
  }
}

// Button component styles - Updated for pill shape
export const createButtonStyles = (colors: ColorPalette): ButtonVariants => ({
  primary: {
    default: {
      backgroundColor: colors.primary.main, // '#44D62C'
      borderColor: colors.primary.main,
      borderWidth: 1,
      borderRadius: 24, // Pill shape as per spec
      padding: { x: 24, y: 12 }, // 12px 24px as per spec
      textStyle: {
        color: colors.text.inverse, // White text
        fontWeight: 600,
        fontSize: 16,
      },
      shadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Subtle drop shadow
    },
    hover: {
      backgroundColor: '#37B02A', // Slightly darker green
      borderColor: '#37B02A',
      shadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
    },
    active: {
      backgroundColor: '#2A8A21',
      borderColor: '#2A8A21',
    },
    disabled: {
      backgroundColor: colors.neutral.mediumGray,
      borderColor: colors.neutral.mediumGray,
      opacity: 0.6,
    },
    focus: {
      borderColor: colors.primary.main,
      shadow: `0 0 0 3px rgba(68, 214, 44, 0.2)`,
    }
  },
  
  secondary: {
    default: {
      backgroundColor: 'transparent',
      borderColor: colors.primary.main, // Primary green border
      borderWidth: 1,
      borderRadius: 24, // Pill shape
      padding: { x: 24, y: 12 },
      textStyle: {
        color: colors.primary.main, // Primary green text
        fontWeight: 600,
        fontSize: 16,
      },
    },
    hover: {
      backgroundColor: colors.secondary.light, // Light green background on hover
      borderColor: '#37B02A',
      textStyle: {
        color: '#37B02A',
      }
    },
    active: {
      backgroundColor: colors.secondary.medium,
    },
    disabled: {
      borderColor: colors.neutral.mediumGray,
      textStyle: {
        color: colors.text.tertiary,
      },
      opacity: 0.6,
    }
  },
  
  text: {
    default: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      borderWidth: 0,
      borderRadius: 24,
      padding: { x: 16, y: 8 },
      textStyle: {
        color: colors.text.brand, // Brand green for links
        fontWeight: 500,
        fontSize: 16,
      },
    },
    hover: {
      backgroundColor: colors.secondary.light,
      textStyle: {
        textDecoration: 'underline',
      }
    },
    active: {
      backgroundColor: colors.secondary.medium,
    },
    disabled: {
      opacity: 0.6,
    }
  },
  
  outline: {
    default: {
      backgroundColor: 'transparent',
      borderColor: colors.primary.main,
      borderWidth: 2,
      borderRadius: 24,
      padding: { x: 22, y: 10 }, // Slightly less padding to account for border
      textStyle: {
        color: colors.primary.main,
        fontWeight: 600,
        fontSize: 16,
      },
    },
    hover: {
      backgroundColor: colors.secondary.light,
      borderColor: '#37B02A',
      textStyle: {
        color: '#37B02A',
      }
    },
    active: {
      backgroundColor: colors.secondary.medium,
    },
    disabled: {
      borderColor: colors.neutral.mediumGray,
      textStyle: {
        color: colors.text.tertiary,
      },
      opacity: 0.6,
    }
  }
})

// Card component styles - Updated for design spec
export const createCardStyles = (colors: ColorPalette): CardVariants => ({
  // Product Card - As per design spec
  product: {
    default: {
      backgroundColor: colors.neutral.white,
      borderColor: 'transparent',
      borderWidth: 0,
      borderRadius: 12, // 12px as per spec
      padding: { x: 16, y: 16 }, // 16px padding
      shadow: '0 2px 8px rgba(0,0,0,0.1)', // Exact shadow from spec
    },
    hover: {
      shadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      borderColor: colors.neutral.lightGray,
    }
  },

  // Feature Card - As per design spec
  feature: {
    default: {
      backgroundColor: colors.secondary.light, // Light green tint
      borderColor: 'transparent',
      borderWidth: 0,
      borderRadius: 16, // 16px as per spec
      padding: { x: 32, y: 32 }, // 32px padding
      // Note: textAlign handled by container CSS, not textStyle
    },
    hover: {
      backgroundColor: colors.secondary.medium,
    }
  },
  
  default: {
    default: {
      backgroundColor: colors.neutral.white,
      borderColor: colors.neutral.mediumGray,
      borderWidth: 1,
      borderRadius: 12,
      padding: { x: 24, y: 24 },
      shadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    },
    hover: {
      shadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      borderColor: colors.neutral.darkGray,
    }
  },
  
  elevated: {
    default: {
      backgroundColor: colors.neutral.white,
      borderColor: 'transparent',
      borderWidth: 0,
      borderRadius: 12,
      padding: { x: 24, y: 24 },
      shadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    hover: {
      shadow: '0 8px 15px rgba(0, 0, 0, 0.15)',
    }
  },
  
  outlined: {
    default: {
      backgroundColor: 'transparent',
      borderColor: colors.neutral.mediumGray,
      borderWidth: 1,
      borderRadius: 12,
      padding: { x: 24, y: 24 },
    },
    hover: {
      borderColor: colors.primary.main,
      backgroundColor: colors.secondary.light,
    }
  }
})

// Input component styles
export const createInputStyles = (colors: ColorPalette): InputVariants => ({
  default: {
    default: {
      backgroundColor: colors.neutral.white,
      borderColor: colors.neutral.mediumGray,
      borderWidth: 1,
      borderRadius: 8,
      padding: { x: 16, y: 12 },
      textStyle: {
        color: colors.text.primary,
        fontSize: 16,
      },
    },
    focus: {
      borderColor: colors.primary.main,
      shadow: `0 0 0 3px rgba(68, 214, 44, 0.1)`,
    },
    disabled: {
      backgroundColor: colors.neutral.lightGray,
      opacity: 0.6,
    }
  },
  
  filled: {
    default: {
      backgroundColor: colors.neutral.lightGray,
      borderColor: 'transparent',
      borderWidth: 0,
      borderRadius: 8,
      padding: { x: 16, y: 12 },
      textStyle: {
        color: colors.text.primary,
        fontSize: 16,
      },
    },
    focus: {
      backgroundColor: colors.neutral.white,
      borderColor: colors.primary.main,
      borderWidth: 1,
      shadow: `0 0 0 3px rgba(68, 214, 44, 0.1)`,
    }
  },
  
  outlined: {
    default: {
      backgroundColor: 'transparent',
      borderColor: colors.neutral.mediumGray,
      borderWidth: 1,
      borderRadius: 8,
      padding: { x: 16, y: 12 },
      textStyle: {
        color: colors.text.primary,
        fontSize: 16,
      },
    },
    focus: {
      borderColor: colors.primary.main,
      shadow: `0 0 0 3px rgba(68, 214, 44, 0.1)`,
    }
  }
})

// Create complete component theme
export const createComponentTheme = (colors: ColorPalette): ComponentTheme => ({
  buttons: createButtonStyles(colors),
  cards: createCardStyles(colors),
  inputs: createInputStyles(colors),
  
  // Navigation Header - As per design spec
  navigation: {
    header: {
      backgroundColor: colors.neutral.white,
      borderColor: 'transparent',
      borderWidth: 0,
      borderRadius: 0,
      padding: { x: 0, y: 0 }, // Height handled separately (64px)
      shadow: '0 1px 3px rgba(0, 0, 0, 0.1)', // Subtle bottom shadow
    }
  },
  
  // Icons - As per design spec
  icons: {
    size: 24, // 24px standard
    color: colors.primary.main, // Primary green or dark gray
    style: 'outlined', // Outlined/line icons
  },
  
  loadingIndicator: {
    color: colors.primary.main,
    size: 24,
    strokeWidth: 2,
  }
})

// Utility functions
export const getComponentStyle = (
  component: ComponentVariant,
  state: keyof ComponentVariant = 'default'
): ComponentStyle => {
  return component[state] || component.default
}

export const generateComponentCSS = (style: ComponentStyle): string => {
  const css = []
  
  if (style.backgroundColor) css.push(`background-color: ${style.backgroundColor}`)
  if (style.borderColor) css.push(`border-color: ${style.borderColor}`)
  if (style.borderWidth !== undefined) css.push(`border-width: ${style.borderWidth}px`)
  if (style.borderRadius !== undefined) css.push(`border-radius: ${style.borderRadius}px`)
  if (style.padding) css.push(`padding: ${style.padding.y}px ${style.padding.x}px`)
  if (style.shadow) css.push(`box-shadow: ${style.shadow}`)
  if (style.opacity !== undefined) css.push(`opacity: ${style.opacity}`)
  
  return css.join('; ')
} 