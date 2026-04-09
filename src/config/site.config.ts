export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  author: string;
  email: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  socialLinks: string[];
  twitter?: {
    site: string;
    creator: string;
  };
  verification?: {
    google?: string;
    bing?: string;
  };
  /**
   * Branding configuration
   * Logo files: Replace SVGs in src/assets/branding/
   * Favicon: Replace in public/favicon.svg
   */
  branding: {
    /** Logo alt text for accessibility */
    logo: {
      alt: string;
    };
    /** Favicon path (lives in public/) */
    favicon: {
      svg: string;
    };
    /** Theme colors for manifest and browser UI */
    colors: {
      /** Browser toolbar color (hex) */
      themeColor: string;
      /** PWA splash screen background (hex) */
      backgroundColor: string;
    };
  };
}

const env = import.meta.env;

const siteConfig: SiteConfig = {
  name: 'Rocketbase',
  description:
    'Digitalpartner für individuelle Software, Prozessoptimierung und nachhaltige Plattformen mit direkter Begleitung durch Marten Prieß.',
  url: env.SITE_URL || env.PUBLIC_SITE_URL || 'https://www.rocketbase.io',
  ogImage: '/og-default.png',
  author: 'Marten Prieß',
  email: 'marten@rocketbase.com',
  socialLinks: [
    'https://github.com/rocketbase-io',
    'https://www.linkedin.com/company/rocketbase-io/',
  ],
  verification: {
    google: env.GOOGLE_SITE_VERIFICATION,
    bing: env.BING_SITE_VERIFICATION,
  },
  // Branding: Logo files live in src/assets/branding/
  // Replace the SVG files there with your own branding
  branding: {
    logo: {
      alt: 'Rocketbase Logo',
    },
    favicon: {
      svg: '/favicon.svg',
    },
    colors: {
      themeColor: '#6372A5',
      backgroundColor: '#ffffff',
    },
  },
};

export default siteConfig;
