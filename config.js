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
    // '$': 'jquery',
    // 'THREE': 'three'
    '$': 'jquery',
    '_': 'underscore',
    'jQuery': 'jquery',
    'window.jQuery': 'jquery'
  },

  shopify: {
    key: process.env.SHOP_KEY,
    pass: process.env.SHOP_PASSWORD,
    secret: process.env.SHOP_SECRET,
    themeId: process.env.SHOP_THEME_ID,
    shopName: process.env.SHOP_NAME,
    flatFolders: [
      'assets',
      'config',
      'layout',
      'locales',
      'templates'
    ],
    multiLevelFolders: [
      'sections',
      'snippets'
    ]
  }

}
 