import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

// Generate a version timestamp for cache-busting
const APP_VERSION = Date.now().toString();
process.env.NEXT_PUBLIC_APP_VERSION = APP_VERSION;

const withNextIntl = createNextIntlPlugin('./src/core/i18n/i18n.ts');

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_APP_VERSION: APP_VERSION,
  },
  async redirects() {
    return [
      {
        source: "/vivaapp",
        destination: "/",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: `/?v=${APP_VERSION}`,
        has: [
          {
            type: 'header',
            key: 'user-agent',
            value: '(.*Telegram.*)',
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
