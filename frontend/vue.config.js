module.exports = {
  outputDir: "../src/main/resources/static",
  // indexPath: "../static/index.html",
  devServer: {
    proxy: {
      "/cdrapi": {
        ws: true,
        changeOrigin: true,
      },
    },
  },
  // chainWebpack: (config) => {
  //   const svgRule = config.module.rule("svg");
  //   svgRule.uses.clear();
  //   svgRule.use("vue-svg-loader").loader("vue-svg-loader");
  // },
};
