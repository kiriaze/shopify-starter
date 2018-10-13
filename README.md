### Set up

1. Make sure you have the latest version of theme kit installed
  - install theme kit `curl -s https://raw.githubusercontent.com/Shopify/themekit/master/scripts/install | sudo python`
2. Connect local env to remote by updating the file src/theme/config.yml with your credentials
3. You can now start developing locally with hmr/browsersync
  - Opens your shop up in a new tab, with the real domain, and hmr/browsersync enabled..
  - Can still access via localhost:3000, but console might get flooded with errors..
4. To clean deploy directory: `npm run clean`
5. When ready to push changes, like css, run `npm run deploy`, which rebuilds and deploys theme.

### Notes
If EADDRINUSE issues:`killall node`
