const { GenerateSW } = require("workbox-webpack-plugin");

// console.log('ENV files data :------------',process.env.NODE_ENV)
module.exports = {
  publicPath: process.env.NODE_ENV === "development" ? "/vuejs-test/" : "",

  configureWebpack: {
    plugins: [new GenerateSW()]
  }
};