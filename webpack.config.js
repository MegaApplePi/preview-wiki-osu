const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  "entry": "./resources/js/app.js",
  "externals": ["electron", "fs"],
  "output": {
    "filename": "index.js"
  },
  "watch": true,
  "watchOptions": {
    "ignored": /node_modules/
  },
  "plugins": [
    new UglifyJsPlugin()
  ]
  // ],
  // "module": {
  //   "rules": [
  //     {
  //       "test": /\.scss$/,
  //       "use": [
  //         {
  //           "loader": "style-loader"
  //         },
  //         {
  //           "loader": "css-loader"
  //         },
  //         {
  //           "loader": "sass-loader",
  //           "options":{
  //             "file": "resources/scss/index.scss",
  //             "outFile": "resources/css/index.css"
  //           }
  //         }
  //       ]
  //     }
  //   ]
  // }
};
