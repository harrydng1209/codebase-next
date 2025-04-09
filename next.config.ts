export default {
  modularizeImports: {
    'lodash-es': {
      transform: 'lodash-es/{{member}}',
    },
  },
  reactStrictMode: true,
  swcMinify: true,
};
