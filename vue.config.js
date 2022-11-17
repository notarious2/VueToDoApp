// const { defineConfig } = require("@vue/cli-service");
// module.exports = defineConfig({
//   publicPath: "/",
//   transpileDependencies: true,
// });

// FOR GITHUB PAGES DEPLOYMENT:
// module.exports = {
//   publicPath: process.env.NODE_ENV === "production" ? "/VueToDoApp/" : "/",
// };

module.exports = {
  publicPath: "",
  productionSourceMap: false, // to hide source cod
  pluginOptions: {
    sitemap: {
      urls: [
        "https://www.stickydo.us/",
        "https://www.stickydo.us/login",
        "https://www.stickydo.us/register",
      ],
    },
  },
};
