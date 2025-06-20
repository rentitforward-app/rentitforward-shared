// Design System - Rental Platform Design System v1.0
// Comprehensive design system for sharing economy marketplace
// Exports all design tokens, components, and utilities

// Core Design Tokens
export * from './colors'
export * from './typography'
export * from './spacing'
export * from './breakpoints'

// Component System
export * from './components'

// Layout System
export * from './layout'

// Pattern System
export * from './patterns'

// Theme Configuration
export * from './theme'
export * from './tokens'

// Re-export commonly used items for convenience
export { lightColors as colors } from './colors'
export { typography } from './typography'
export { spacing } from './spacing'
export { breakpoints } from './breakpoints'
export { patterns } from './patterns'
export { sections, gridPatterns, containers } from './layout'

// Main theme configuration
export { createTheme, useTheme } from './theme'
export type { Theme, ThemeConfig } from './theme' 