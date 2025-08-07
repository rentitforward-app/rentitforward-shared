/**
 * Shared search utilities for predictive text and suggestions
 * Used across web and mobile platforms
 */

import type {
  SearchSuggestion,
  SearchSuggestionsResponse,
  SearchSuggestionRequest,
  PredictiveTextConfig,
  SearchHistoryItem,
  SearchCorrection,
  PopularSearch,
  RecentSearch
} from '../types/search';
import { SearchSuggestionType } from '../types/search';

// Default configuration for predictive text
export const DEFAULT_PREDICTIVE_CONFIG: PredictiveTextConfig = {
  min_chars: 2,
  max_suggestions: 8,
  debounce_delay: 300,
  enable_cache: true,
  cache_ttl: 5 * 60 * 1000, // 5 minutes
  enable_corrections: true,
  enable_trending: true,
  include_icons: true,
};

// Common search categories with icons
export const SEARCH_CATEGORIES = [
  { id: 'tools_diy_equipment', name: 'Tools & DIY Equipment', icon: '🔧', keywords: ['drill', 'saw', 'hammer', 'screwdriver', 'tool'] },
  { id: 'cameras_photography_gear', name: 'Cameras & Photography Gear', icon: '📷', keywords: ['camera', 'lens', 'tripod', 'flash', 'photography'] },
  { id: 'event_party_equipment', name: 'Event & Party Equipment', icon: '🎉', keywords: ['tent', 'speaker', 'microphone', 'projector', 'party'] },
  { id: 'camping_outdoor_gear', name: 'Camping & Outdoor Gear', icon: '🏕️', keywords: ['tent', 'sleeping bag', 'hiking', 'camping', 'outdoor'] },
  { id: 'tech_electronics', name: 'Tech & Electronics', icon: '📱', keywords: ['laptop', 'phone', 'tablet', 'electronics', 'tech'] },
  { id: 'vehicles_transport', name: 'Vehicles & Transport', icon: '🚗', keywords: ['car', 'bike', 'scooter', 'vehicle', 'transport'] },
  { id: 'home_garden_appliances', name: 'Home & Garden Appliances', icon: '🏡', keywords: ['appliance', 'garden', 'home', 'kitchen', 'cleaning'] },
  { id: 'sports_fitness_equipment', name: 'Sports & Fitness Equipment', icon: '🏃', keywords: ['fitness', 'sports', 'gym', 'exercise', 'workout'] },
  { id: 'musical_instruments_gear', name: 'Musical Instruments & Gear', icon: '🎸', keywords: ['guitar', 'piano', 'drum', 'music', 'instrument'] },
  { id: 'costumes_props', name: 'Costumes & Props', icon: '🎭', keywords: ['costume', 'props', 'theater', 'halloween', 'dress up'] },
  { id: 'maker_craft_supplies', name: 'Maker & Craft Supplies', icon: '✂️', keywords: ['craft', 'art', 'supplies', 'making', 'creative'] },
] as const;

// Common item names with associated keywords
export const COMMON_ITEMS = [
  { name: 'Camera', keywords: ['dslr', 'mirrorless', 'photography', 'canon', 'nikon'], category: 'cameras_photography_gear' },
  { name: 'Drill', keywords: ['power drill', 'cordless', 'electric', 'dewalt', 'milwaukee'], category: 'tools_diy_equipment' },
  { name: 'Laptop', keywords: ['computer', 'macbook', 'pc', 'gaming', 'work'], category: 'tech_electronics' },
  { name: 'Tent', keywords: ['camping', 'outdoor', 'shelter', 'hiking', 'backpacking'], category: 'camping_outdoor_gear' },
  { name: 'Projector', keywords: ['presentation', 'movie', 'screen', 'display', 'home theater'], category: 'event_party_equipment' },
  { name: 'Guitar', keywords: ['acoustic', 'electric', 'bass', 'music', 'strings'], category: 'musical_instruments_gear' },
  { name: 'Bike', keywords: ['bicycle', 'cycling', 'mountain', 'road', 'electric'], category: 'vehicles_transport' },
  { name: 'Lawnmower', keywords: ['lawn', 'grass', 'mowing', 'garden', 'yard'], category: 'home_garden_appliances' },
  { name: 'Treadmill', keywords: ['running', 'exercise', 'cardio', 'fitness', 'gym'], category: 'sports_fitness_equipment' },
  { name: 'Sewing Machine', keywords: ['craft', 'fabric', 'tailoring', 'quilting', 'making'], category: 'maker_craft_supplies' },
] as const;

// Popular brands across categories
export const POPULAR_BRANDS = [
  'Apple', 'Canon', 'Nikon', 'Sony', 'Dewalt', 'Milwaukee', 'Black & Decker',
  'Nike', 'Adidas', 'GoPro', 'Bose', 'Samsung', 'LG', 'Honda', 'Toyota',
  'Coleman', 'North Face', 'Patagonia', 'REI', 'Fender', 'Gibson', 'Yamaha'
] as const;

/**
 * Generate text-based search suggestions using fuzzy matching
 */
export function generateTextSuggestions(
  query: string,
  existingData: string[],
  maxSuggestions: number = 5
): SearchSuggestion[] {
  if (!query || query.length < 2) return [];

  const normalizedQuery = normalizeSearchText(query);
  const suggestions: SearchSuggestion[] = [];

  // Find matches in existing data
  for (const item of existingData) {
    const normalizedItem = normalizeSearchText(item);
    const similarity = calculateStringSimilarity(normalizedQuery, normalizedItem);
    
    if (similarity > 0.3) { // Threshold for relevance
      suggestions.push({
        text: item,
        type: SearchSuggestionType.QUERY_COMPLETION,
        confidence: similarity,
      });
    }
  }

  // Sort by confidence and return top suggestions
  return suggestions
    .sort((a, b) => (b.confidence || 0) - (a.confidence || 0))
    .slice(0, maxSuggestions);
}

/**
 * Generate category suggestions based on query
 */
export function generateCategorySuggestions(query: string): SearchSuggestion[] {
  if (!query || query.length < 2) return [];

  const normalizedQuery = normalizeSearchText(query);
  const suggestions: SearchSuggestion[] = [];

  for (const category of SEARCH_CATEGORIES) {
    // Check if query matches category name
    const categoryNameSimilarity = calculateStringSimilarity(
      normalizedQuery, 
      normalizeSearchText(category.name)
    );

    if (categoryNameSimilarity > 0.4) {
      suggestions.push({
        text: category.name,
        type: SearchSuggestionType.CATEGORY,
        category: category.id,
        icon: category.icon,
        confidence: categoryNameSimilarity,
      });
      continue;
    }

    // Check if query matches any keywords
    for (const keyword of category.keywords) {
      const keywordSimilarity = calculateStringSimilarity(
        normalizedQuery,
        normalizeSearchText(keyword)
      );

      if (keywordSimilarity > 0.6) {
        suggestions.push({
          text: category.name,
          type: SearchSuggestionType.CATEGORY,
          category: category.id,
          icon: category.icon,
          confidence: keywordSimilarity * 0.8, // Slightly lower confidence for keyword matches
        });
        break; // Only add category once
      }
    }
  }

  return suggestions
    .sort((a, b) => (b.confidence || 0) - (a.confidence || 0))
    .slice(0, 3); // Limit category suggestions
}

/**
 * Generate item name suggestions
 */
export function generateItemSuggestions(query: string): SearchSuggestion[] {
  if (!query || query.length < 2) return [];

  const normalizedQuery = normalizeSearchText(query);
  const suggestions: SearchSuggestion[] = [];

  for (const item of COMMON_ITEMS) {
    // Check item name
    const nameSimilarity = calculateStringSimilarity(
      normalizedQuery,
      normalizeSearchText(item.name)
    );

    if (nameSimilarity > 0.4) {
      const categoryInfo = SEARCH_CATEGORIES.find(c => c.id === item.category);
      suggestions.push({
        text: item.name,
        type: SearchSuggestionType.ITEM_NAME,
        category: item.category,
        icon: categoryInfo?.icon,
        confidence: nameSimilarity,
      });
      continue;
    }

    // Check keywords
    for (const keyword of item.keywords) {
      const keywordSimilarity = calculateStringSimilarity(
        normalizedQuery,
        normalizeSearchText(keyword)
      );

      if (keywordSimilarity > 0.7) {
        const categoryInfo = SEARCH_CATEGORIES.find(c => c.id === item.category);
        suggestions.push({
          text: item.name,
          type: SearchSuggestionType.ITEM_NAME,
          category: item.category,
          icon: categoryInfo?.icon,
          confidence: keywordSimilarity * 0.9,
        });
        break;
      }
    }
  }

  return suggestions
    .sort((a, b) => (b.confidence || 0) - (a.confidence || 0))
    .slice(0, 4);
}

/**
 * Generate brand suggestions
 */
export function generateBrandSuggestions(query: string): SearchSuggestion[] {
  if (!query || query.length < 2) return [];

  const normalizedQuery = normalizeSearchText(query);
  const suggestions: SearchSuggestion[] = [];

  for (const brand of POPULAR_BRANDS) {
    const similarity = calculateStringSimilarity(
      normalizedQuery,
      normalizeSearchText(brand)
    );

    if (similarity > 0.4) {
      suggestions.push({
        text: brand,
        type: SearchSuggestionType.BRAND,
        icon: '🏷️',
        confidence: similarity,
      });
    }
  }

  return suggestions
    .sort((a, b) => (b.confidence || 0) - (a.confidence || 0))
    .slice(0, 3);
}

/**
 * Generate comprehensive search suggestions
 */
export function generateSearchSuggestions(
  query: string,
  config: Partial<PredictiveTextConfig> = {},
  context?: {
    recentSearches?: RecentSearch[];
    popularSearches?: PopularSearch[];
    existingItems?: string[];
  }
): SearchSuggestion[] {
  const finalConfig = { ...DEFAULT_PREDICTIVE_CONFIG, ...config };
  
  if (!query || query.length < finalConfig.min_chars) {
    return [];
  }

  const allSuggestions: SearchSuggestion[] = [];

  // Generate different types of suggestions
  allSuggestions.push(...generateCategorySuggestions(query));
  allSuggestions.push(...generateItemSuggestions(query));
  allSuggestions.push(...generateBrandSuggestions(query));

  // Add text-based suggestions if we have existing data
  if (context?.existingItems) {
    allSuggestions.push(
      ...generateTextSuggestions(query, context.existingItems, 3)
    );
  }

  // Add recent searches that match
  if (context?.recentSearches) {
    const recentMatches = context.recentSearches
      .filter(search => 
        normalizeSearchText(search.query).includes(normalizeSearchText(query))
      )
      .slice(0, 2)
      .map(search => ({
        text: search.query,
        type: SearchSuggestionType.RECENT_SEARCH,
        icon: '🕒',
        confidence: 0.8,
      } as SearchSuggestion));
    
    allSuggestions.push(...recentMatches);
  }

  // Remove duplicates and sort by confidence
  const uniqueSuggestions = removeDuplicateSuggestions(allSuggestions);
  
  return uniqueSuggestions
    .sort((a, b) => (b.confidence || 0) - (a.confidence || 0))
    .slice(0, finalConfig.max_suggestions);
}

/**
 * Generate spelling corrections for search queries
 */
export function generateSpellingCorrections(query: string): SearchCorrection[] {
  if (!query || query.length < 3) return [];

  const corrections: SearchCorrection[] = [];
  const words = query.toLowerCase().split(/\s+/);

  // Simple correction examples (in a real app, use a proper spell checker)
  const commonCorrections: Record<string, string> = {
    'camara': 'camera',
    'photgraphy': 'photography',
    'equipement': 'equipment',
    'exersice': 'exercise',
    'instrament': 'instrument',
    'drille': 'drill',
    'laptoop': 'laptop',
    'guitarre': 'guitar',
  };

  let hasCorrections = false;
  const correctedWords = words.map(word => {
    if (commonCorrections[word]) {
      hasCorrections = true;
      return commonCorrections[word];
    }
    return word;
  });

  if (hasCorrections) {
    corrections.push({
      original: query,
      corrected: correctedWords.join(' '),
      confidence: 0.8,
    });
  }

  return corrections;
}

/**
 * Normalize text for comparison (lowercase, trim, remove special chars)
 */
export function normalizeSearchText(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, '') // Remove special characters
    .replace(/\s+/g, ' '); // Normalize whitespace
}

/**
 * Calculate string similarity using Levenshtein distance
 */
export function calculateStringSimilarity(str1: string, str2: string): number {
  if (str1 === str2) return 1.0;
  if (str1.length === 0 || str2.length === 0) return 0.0;

  // Quick check for substring matches
  if (str1.includes(str2) || str2.includes(str1)) {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    return shorter.length / longer.length;
  }

  // Calculate edit distance
  const matrix: number[][] = [];
  const len1 = str1.length;
  const len2 = str2.length;

  // Initialize matrix
  for (let i = 0; i <= len1; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j;
  }

  // Fill matrix
  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,    // deletion
          matrix[i][j - 1] + 1,    // insertion
          matrix[i - 1][j - 1] + 1 // substitution
        );
      }
    }
  }

  const maxLength = Math.max(len1, len2);
  const editDistance = matrix[len1][len2];
  
  return 1 - (editDistance / maxLength);
}

/**
 * Remove duplicate suggestions based on text
 */
export function removeDuplicateSuggestions(suggestions: SearchSuggestion[]): SearchSuggestion[] {
  const seen = new Set<string>();
  const unique: SearchSuggestion[] = [];

  for (const suggestion of suggestions) {
    const key = suggestion.text.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(suggestion);
    }
  }

  return unique;
}

/**
 * Create a debounced function for search suggestions
 */
export function createSearchDebouncer<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): T {
  let timeoutId: NodeJS.Timeout | null = null;
  
  return ((...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  }) as T;
}

/**
 * Simple cache implementation for search suggestions
 */
export class SearchSuggestionCacheManager {
  private cache = new Map<string, { data: SearchSuggestion[]; expires: number }>();
  private ttl: number;

  constructor(ttlMs: number = 5 * 60 * 1000) { // 5 minutes default
    this.ttl = ttlMs;
  }

  set(key: string, suggestions: SearchSuggestion[]): void {
    const expires = Date.now() + this.ttl;
    this.cache.set(key.toLowerCase(), { data: suggestions, expires });
  }

  get(key: string): SearchSuggestion[] | null {
    const entry = this.cache.get(key.toLowerCase());
    
    if (!entry) {
      return null;
    }
    
    if (Date.now() > entry.expires) {
      this.cache.delete(key.toLowerCase());
      return null;
    }
    
    return entry.data;
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }
}

/**
 * Create search suggestion request object
 */
export function createSearchSuggestionRequest(
  query: string,
  options: Partial<SearchSuggestionRequest> = {}
): SearchSuggestionRequest {
  return {
    query: query.trim(),
    limit: 8,
    types: [
      SearchSuggestionType.QUERY_COMPLETION,
      SearchSuggestionType.CATEGORY,
      SearchSuggestionType.ITEM_NAME,
      SearchSuggestionType.BRAND,
    ],
    include_popular: true,
    include_recent: true,
    platform: 'web',
    ...options,
  };
}

/**
 * Filter suggestions based on type and relevance
 */
export function filterSuggestions(
  suggestions: SearchSuggestion[],
  filters: {
    types?: SearchSuggestionType[];
    minConfidence?: number;
    maxResults?: number;
  }
): SearchSuggestion[] {
  let filtered = suggestions;

  // Filter by types
  if (filters.types && filters.types.length > 0) {
    filtered = filtered.filter(s => filters.types!.includes(s.type));
  }

  // Filter by confidence
  if (filters.minConfidence !== undefined) {
    filtered = filtered.filter(s => (s.confidence || 0) >= filters.minConfidence!);
  }

  // Limit results
  if (filters.maxResults) {
    filtered = filtered.slice(0, filters.maxResults);
  }

  return filtered;
}