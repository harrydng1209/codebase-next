export default {
  env: {
    API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
  },
  modularizeImports: {
    'lodash-es': {
      transform: 'lodash-es/{{member}}',
    },
  },
  reactStrictMode: true,
  swcMinify: true,
};
