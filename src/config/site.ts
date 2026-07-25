export const siteConfig = {
  name: 'Campus Minutes',
  description: 'Instant food delivery and Xerox document printing inside COEP campus in minutes.',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  ogImage: '/og-image.png',
  links: {
    github: 'https://github.com/Durvesh24/campus-minutes',
  },
} as const;

export type SiteConfig = typeof siteConfig;
