/**
 * Route Definitions for Translated URLs
 *
 * This file defines the URL slugs for each route in each supported locale.
 * The route ID (key) is used internally to reference routes, while the values
 * define the actual URL segments for each language.
 *
 * Example:
 * - Route 'about' → /about (en), /es/sobre-nosotros (es), /fr/a-propos (fr)
 *
 * Note: Empty string '' represents the root/home page.
 */

import type { Locale } from './config';

/**
 * Navigation configuration for a route
 */
export type NavConfig = {
  /** Whether to show this route in the navbar */
  show: boolean;
  /** Sort order in navigation (lower = first) */
  order: number;
  /** Translation key for the navigation label (e.g., 'nav.about') */
  label: string;
};

/**
 * A route definition maps each locale to its URL slug
 * Optionally includes navigation configuration
 */
export type RouteDefinition = Record<Locale, string> & {
  nav?: NavConfig;
};

/**
 * Route definitions for all static pages
 *
 * Keys are internal route IDs (use these in LocalizedLink and getLocalizedPath)
 * Values are the URL slugs for each locale, plus optional nav config
 *
 * Rules:
 * - Use lowercase letters and hyphens only (no underscores, no special chars)
 * - Empty string '' for home/root page
 * - Do not include leading or trailing slashes
 */
export const routes = {
  // Home page (root) - not shown in nav (logo links there)
  home: {
    de: '',
    nav: { show: false, order: 0, label: 'nav.home' },
  },

  // Static pages
  about: {
    de: 'about',
    nav: { show: true, order: 2, label: 'nav.about' },
  },
  contact: {
    de: 'contact',
    nav: { show: true, order: 3, label: 'nav.contact' },
  },

  // Blog section
  blog: {
    de: 'blog',
    nav: { show: false, order: 99, label: 'nav.blog' },
  },

  // Components showcase
  components: {
    de: 'components',
    nav: { show: false, order: 98, label: 'nav.components' },
  },

  // Custom page: services
  services: {
    de: 'services',
    nav: { show: true, order: 1, label: 'nav.services' },
  },
} as const satisfies Record<string, RouteDefinition>;

/**
 * Type-safe route identifier
 */
export type RouteId = keyof typeof routes;

/**
 * Get all available route IDs
 */
export const routeIds = Object.keys(routes) as RouteId[];

/**
 * Validate if a string is a valid route ID
 */
export function isValidRouteId(id: string): id is RouteId {
  return id in routes;
}

// Export types
export type { NavConfig };
