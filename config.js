'use strict';

require('dotenv').config();

const assets = {
  scripts: 'assets/scripts'
};

module.exports = {

  root        : '/',
  host        : 'localhost',
  serverport  : 3000,

  src: {
    root: './src',
    styles: './src/styles',
    scripts: './src/scripts',
    fonts: [
      './src/fonts/**/*'
    ],
    icons: [
      './src/icons/**/*'
    ],
    images: [
      './src/images/**/*.{svg,png,jpg,jpeg,gif,ico}'
    ],
    shopify: [
      './src/theme/**/*'
    ],
    theme: './src/theme'
  },

  dist: '.deploy',

  assets,

  entry: ['main', 'styleguide'],

  // match with package.json dependencies
  // $ npm install package --save
  dependencies: {
    '$': 'jquery',
    // '_': 'underscore',
    // 'jQuery': 'jquery',
    // 'window.jQuery': 'jquery'
  }

}



//'use strict';

// var src   = './',
//   dist  = './',
//   assets  = 'assets';

// module.exports = {

//   root: '/',

//   src,

//   dist,

//   assets,
  
//   entry: ['app', 'styleguide', 'login'],

//   // match with package.json dependencies
//   // $ npm install package --save
//   dependencies: {
//     '$': 'jquery',
//     // 'THREE': 'three',
//     // 'jQuery': 'jquery',
//     // 'window.jQuery': 'jquery'
//   },

//   // swap commented out proxy/localhost if needing to access on other devices via ip address
//   // 'localhost' || '0.0.0.0'
//   proxy: false,
//   localhost: '127.0.0.1', // for safari sake..
//   // localhost: 'localhost',
//   // proxy: true,
//   // localhost: '0.0.0.0',

//   port: {
//     server: 8000,
//     webpack: 3000
//   }

// };