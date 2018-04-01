const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: {
    app: ['./test/app.js', './src/Portal.js']
  },

  output: {
    path: path.resolve(__dirname, "test/dist"),
    filename: "bundle.js"
  }
};
