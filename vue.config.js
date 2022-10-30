// const { defineConfig } = require("@vue/cli-service");
// module.exports = defineConfig({
//   publicPath: "/",
//   transpileDependencies: true,
// });

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/VueToDoApp/" : "/",
};
