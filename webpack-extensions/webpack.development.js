const path = require('path');

const SERVER_PORT = process.env.SERVER_PORT || 1234;

module.exports = {
  devtool: "cheap-module-source-map",
  output: {
    filename: 'main.js'
  },
  devServer: {
    historyApiFallback: true, // Allow deep links with dev server
    proxy: { // Proxy requests to the BFF
      '/api/*': `http://localhost:${PORT}`
    }
  }
};
