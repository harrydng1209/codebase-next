import type { NextConfig } from 'next';
import type { Configuration } from 'webpack';

import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          as: '*.js',
          loaders: ['@svgr/webpack'],
        },
      },
    },
  },

  reactStrictMode: true,

  sassOptions: {
    includePaths: [path.join(process.cwd(), 'src')],
    prependData: `
      @import "@/assets/styles/root/variables";
      @import "@/assets/styles/root/mixins";
    `,
  },

  webpack(config: Configuration) {
    if (config.module?.rules)
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });

    return config;
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
