// module.exports = {
//   "use": [
//     "autoprefixer",
//     "postcss-url"
//   ],
//   "input": "./deploy/assets/main.bundle.css",
//   "output": "./deploy/assets/style.css.liquid",
//   "local-plugins": true,
//   "autoprefixer": {
//     "browsers": "> 5%"
//   },
//   "postcss-url": {
//     // the only part really needed is this url swap for asset references in css
//     url: function(data) { return data.url.split('/').pop() }
//   }
// }