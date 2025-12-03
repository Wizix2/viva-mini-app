import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/core/i18n/i18n.ts');

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/vivaapp",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
