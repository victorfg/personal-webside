// const { i18n } = {
//   i18n: {
//     locales: ["en"],
//     defaultLocale: "en",
//   },
// };

module.exports = {
  //i18n,
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
