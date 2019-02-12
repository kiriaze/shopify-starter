'use strict';

require('dotenv').config();

module.exports = {

  root: '/',
  host: '127.0.0.1', // 'localhost',
  port: 3000,

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

  assets: 'assets',

  entry: ['main', 'styleguide'],

  // match with package.json dependencies
  // $ npm install package --save
  dependencies: {
    '$': 'jquery',
    // '_': 'underscore',
    // 'jQuery': 'jquery',
    // 'window.jQuery': 'jquery'
  },

  shopify: {
    themeId: process.env.SHOP_THEME_ID,
    shopName: process.env.SHOP_NAME,
  }

}