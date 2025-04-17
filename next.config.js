import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  sassOptions: {
    includePaths: [path.join(process.cwd(), 'src')],
    prependData: `
      @import "@/assets/styles/root/variables";
      @import "@/assets/styles/root/mixins";
    `,
  },

  webpack(config) {
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
