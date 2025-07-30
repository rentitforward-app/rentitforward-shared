/**
 * Shared API client patterns for search suggestions and autocomplete
 * Used across web and mobile platforms
 */

import type {
  SearchSuggestion,
  SearchSuggestionsResponse,
  SearchSuggestionRequest,
  SearchSuggestionResult,
  SearchSuggestionError,
  PredictiveTextConfig,
  SearchHistoryItem,
  PopularSearch,
  RecentSearch
} from '../types/search';

import {
  generateSearchSuggestions,
  createSearchDebouncer,
  SearchSuggestionCache,
  createSearchSuggestionRequest,
  DEFAULT_PREDICTIVE_CONFIG
} from './search';

// API endpoints
export const SEARCH_API_ENDPOINTS = {
  SUGGESTIONS: '/api/search/suggestions',
  POPULAR: '/api/search/popular',
  RECENT: '/api/search/recent',
  HISTORY: '/api/search/history',
  ANALYTICS: '/api/search/analytics',
} as const;

/**
 * Base API client for search suggestions
 */
export class SearchSuggestionAPI {
  private baseUrl: string;
  private cache: SearchSuggestionCache;
  private config: PredictiveTextConfig;
  private debouncedFetch: (request: SearchSuggestionRequest) => Promise<SearchSuggestionResult>;

  constructor(
    baseUrl: string = '',
    config: Partial<PredictiveTextConfig> = {}
  ) {
    this.baseUrl = baseUrl;
    this.config = { ...DEFAULT_PREDICTIVE_CONFIG, ...config };
    this.cache = new SearchSuggestionCache(this.config.cache_ttl);
    
    // Create debounced fetch function
    this.debouncedFetch = createSearchDebouncer(
      this.fetchSuggestionsFromAPI.bind(this),
      this.config.debounce_delay
    );
  }

  /**
   * Get search suggestions with caching and debouncing
   */
  async getSuggestions(
    query: string,
    options: Partial<SearchSuggestionRequest> = {}
  ): Promise<SearchSuggestionResult> {
    // Input validation
    if (!query || query.length < this.config.min_chars) {
      return {
        success: true,
        data: {
          suggestions: [],
          popular_searches: [],
          recent_searches: [],
        },
      };
    }

    const cacheKey = this.createCacheKey(query, options);

    // Check cache first
    if (this.config.enable_cache) {
      const cached = this.cache.get(cacheKey);
      if (cached) {
        return {
          success: true,
          data: {
            suggestions: cached,
            popular_searches: [],
            recent_searches: [],
          },
        };
      }
    }

    // Create request object
    const request = createSearchSuggestionRequest(query, {
      platform: 'web', // Default platform, override in options
      ...options,
    });

    try {
      // Use debounced fetch for live suggestions
      const result = await this.debouncedFetch(request);
      
      // Cache successful results
      if (result.success && this.config.enable_cache) {
        this.cache.set(cacheKey, result.data.suggestions);
      }

      return result;
    } catch (error) {
      console.error('Error fetching search suggestions:', error);
      
      // Fallback to local suggestions
      return this.getFallbackSuggestions(query, options);
    }
  }

  /**
   * Get popular searches
   */
  async getPopularSearches(limit: number = 10): Promise<PopularSearch[]> {
    try {
      const response = await this.fetchFromAPI(SEARCH_API_ENDPOINTS.POPULAR, {
        method: 'GET',
        params: { limit },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data.popular_searches || [];
    } catch (error) {
      console.error('Error fetching popular searches:', error);
      return this.getFallbackPopularSearches();
    }
  }

  /**
   * Get user's recent searches
   */
  async getRecentSearches(userId: string, limit: number = 10): Promise<RecentSearch[]> {
    try {
      const response = await this.fetchFromAPI(SEARCH_API_ENDPOINTS.RECENT, {
        method: 'GET',
        params: { user_id: userId, limit },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data.recent_searches || [];
    } catch (error) {
      console.error('Error fetching recent searches:', error);
      return [];
    }
  }

  /**
   * Save search to history
   */
  async saveSearchToHistory(searchData: {
    query: string;
    user_id?: string;
    result_count: number;
    filters?: Record<string, any>;
    platform: 'web' | 'mobile';
  }): Promise<boolean> {
    try {
      const response = await this.fetchFromAPI(SEARCH_API_ENDPOINTS.HISTORY, {
        method: 'POST',
        body: JSON.stringify(searchData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.ok;
    } catch (error) {
      console.error('Error saving search to history:', error);
      return false;
    }
  }

  /**
   * Get instant local suggestions (for offline/fallback scenarios)
   */
  getInstantSuggestions(
    query: string,
    context?: {
      existingItems?: string[];
      recentSearches?: RecentSearch[];
      popularSearches?: PopularSearch[];
    }
  ): SearchSuggestion[] {
    return generateSearchSuggestions(query, this.config, context);
  }

  /**
   * Clear suggestion cache
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig: Partial<PredictiveTextConfig>): void {
    this.config = { ...this.config, ...newConfig };
    
    // Update cache TTL if changed
    if (newConfig.cache_ttl) {
      this.cache = new SearchSuggestionCache(newConfig.cache_ttl);
    }
  }

  /**
   * Private method to fetch suggestions from API
   */
  private async fetchSuggestionsFromAPI(
    request: SearchSuggestionRequest
  ): Promise<SearchSuggestionResult> {
    try {
      const response = await this.fetchFromAPI(SEARCH_API_ENDPOINTS.SUGGESTIONS, {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP ${response.status}: ${response.statusText}`
        );
      }

      const data: SearchSuggestionsResponse = await response.json();
      return { success: true, data };
    } catch (error) {
      const searchError: SearchSuggestionError = {
        code: 'API_ERROR',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        details: error,
      };

      return { success: false, error: searchError };
    }
  }

  /**
   * Generic API fetch method
   */
  private async fetchFromAPI(
    endpoint: string,
    options: {
      method: string;
      body?: string;
      headers?: Record<string, string>;
      params?: Record<string, any>;
    }
  ): Promise<Response> {
    let url = `${this.baseUrl}${endpoint}`;

    // Add query parameters
    if (options.params) {
      const searchParams = new URLSearchParams();
      Object.entries(options.params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
      
      if (searchParams.toString()) {
        url += `?${searchParams.toString()}`;
      }
    }

    return fetch(url, {
      method: options.method,
      body: options.body,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
  }

  /**
   * Create cache key for request
   */
  private createCacheKey(
    query: string,
    options: Partial<SearchSuggestionRequest>
  ): string {
    const key = {
      query: query.trim().toLowerCase(),
      types: options.types?.sort(),
      limit: options.limit,
      platform: options.platform,
    };
    
    return JSON.stringify(key);
  }

  /**
   * Fallback suggestions when API is unavailable
   */
  private getFallbackSuggestions(
    query: string,
    options: Partial<SearchSuggestionRequest>
  ): SearchSuggestionResult {
    try {
      const suggestions = generateSearchSuggestions(query, this.config);
      
      return {
        success: true,
        data: {
          suggestions,
          popular_searches: [],
          recent_searches: [],
        },
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'FALLBACK_ERROR',
          message: 'Failed to generate fallback suggestions',
          details: error,
        },
      };
    }
  }

  /**
   * Fallback popular searches
   */
  private getFallbackPopularSearches(): PopularSearch[] {
    return [
      { query: 'camera', count: 245 },
      { query: 'drill', count: 189 },
      { query: 'laptop', count: 156 },
      { query: 'tent', count: 134 },
      { query: 'guitar', count: 112 },
      { query: 'projector', count: 98 },
      { query: 'bike', count: 87 },
      { query: 'power tools', count: 76 },
    ];
  }
}

/**
 * Hook-style API for React applications
 */
export function createSearchSuggestionHook(apiClient: SearchSuggestionAPI) {
  return {
    /**
     * Get suggestions with built-in state management
     */
    useSuggestions: (query: string, options: Partial<SearchSuggestionRequest> = {}) => {
      // This would be implemented differently in React vs React Native
      // For now, return the core functionality
      return {
        getSuggestions: (q: string) => apiClient.getSuggestions(q, options),
        getInstant: (q: string) => apiClient.getInstantSuggestions(q),
        clearCache: () => apiClient.clearCache(),
      };
    },

    /**
     * Popular searches hook
     */
    usePopularSearches: (limit: number = 10) => {
      return {
        getPopular: () => apiClient.getPopularSearches(limit),
      };
    },

    /**
     * Recent searches hook
     */
    useRecentSearches: (userId: string, limit: number = 10) => {
      return {
        getRecent: () => apiClient.getRecentSearches(userId, limit),
        saveSearch: (searchData: any) => apiClient.saveSearchToHistory(searchData),
      };
    },
  };
}

/**
 * Factory function to create API client instances
 */
export function createSearchAPI(
  baseUrl: string,
  config: Partial<PredictiveTextConfig> = {}
): SearchSuggestionAPI {
  return new SearchSuggestionAPI(baseUrl, config);
}

/**
 * Platform-specific API client creators
 */
export const createWebSearchAPI = (baseUrl: string = '') => 
  createSearchAPI(baseUrl, { platform: 'web' } as any);

export const createMobileSearchAPI = (baseUrl: string = '') => 
  createSearchAPI(baseUrl, { platform: 'mobile' } as any);

/**
 * Local storage helper for search history (client-side)
 */
export class LocalSearchHistory {
  private storageKey: string;
  private maxItems: number;

  constructor(storageKey: string = 'search_history', maxItems: number = 50) {
    this.storageKey = storageKey;
    this.maxItems = maxItems;
  }

  /**
   * Add search to local history
   */
  addSearch(query: string): void {
    if (!query.trim()) return;

    try {
      const history = this.getHistory();
      const newSearch: RecentSearch = {
        query: query.trim(),
        timestamp: new Date(),
      };

      // Remove existing entry if it exists
      const filtered = history.filter(item => item.query !== newSearch.query);
      
      // Add to beginning and limit size
      const updated = [newSearch, ...filtered].slice(0, this.maxItems);
      
      this.saveHistory(updated);
    } catch (error) {
      console.error('Error adding search to local history:', error);
    }
  }

  /**
   * Get local search history
   */
  getHistory(): RecentSearch[] {
    try {
      const stored = this.getFromStorage();
      if (!stored) return [];

      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed.map(item => ({
        ...item,
        timestamp: new Date(item.timestamp),
      })) : [];
    } catch (error) {
      console.error('Error getting local search history:', error);
      return [];
    }
  }

  /**
   * Clear local history
   */
  clearHistory(): void {
    try {
      this.removeFromStorage();
    } catch (error) {
      console.error('Error clearing local search history:', error);
    }
  }

  /**
   * Remove specific search from history
   */
  removeSearch(query: string): void {
    try {
      const history = this.getHistory();
      const filtered = history.filter(item => item.query !== query);
      this.saveHistory(filtered);
    } catch (error) {
      console.error('Error removing search from local history:', error);
    }
  }

  /**
   * Platform-agnostic storage getters
   */
  private getFromStorage(): string | null {
    // This would be implemented differently for web vs mobile
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage.getItem(this.storageKey);
    }
    return null;
  }

  private saveToStorage(data: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(this.storageKey, data);
    }
  }

  private removeFromStorage(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(this.storageKey);
    }
  }

  private saveHistory(history: RecentSearch[]): void {
    try {
      this.saveToStorage(JSON.stringify(history));
    } catch (error) {
      console.error('Error saving search history:', error);
    }
  }
}