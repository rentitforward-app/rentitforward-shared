/**
 * Platform detection utilities for shared package
 * Allows conditional imports based on environment
 */

/**
 * Detect if we're running in React Native environment
 */
export function isReactNative(): boolean {
  try {
    // React Native has a global navigator.product
    return (
      typeof (globalThis as any).navigator !== 'undefined' && 
      (globalThis as any).navigator.product === 'ReactNative'
    );
  } catch {
    return false;
  }
}

/**
 * Detect if we're running in Node.js environment (server-side)
 */
export function isNode(): boolean {
  try {
    return (
      typeof process !== 'undefined' &&
      process.versions &&
      !!process.versions.node
    );
  } catch {
    return false;
  }
}

/**
 * Detect if we're running in browser environment
 */
export function isBrowser(): boolean {
  try {
    return (
      typeof (globalThis as any).window !== 'undefined' &&
      typeof (globalThis as any).document !== 'undefined'
    );
  } catch {
    return false;
  }
}

/**
 * Get current platform type
 */
export type PlatformType = 'react-native' | 'node' | 'browser' | 'unknown';

export function getPlatform(): PlatformType {
  if (isReactNative()) return 'react-native';
  if (isNode()) return 'node';
  if (isBrowser()) return 'browser';
  return 'unknown';
}