const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  "entry": "./assets/js/app.js",
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
  //             "file": "assets/scss/index.scss",
  //             "outFile": "assets/css/index.css"
  //           }
  //         }
  //       ]
  //     }
  //   ]
  // }
};
