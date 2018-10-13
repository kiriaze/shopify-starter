### Set up

1. Make sure you have the latest version of theme kit installed
  - install theme kit `curl -s https://raw.githubusercontent.com/Shopify/themekit/master/scripts/install | sudo python`
2. Connect local env to remote
  - create configuration by duplicating the debut theme ( or any other theme ) in the admin, publishing it, and grabbing the theme id by clicking on it and passing it in the below command.
  - `theme configure --password=[your-password] --store=[you-store.myshopify.com] --themeid=[your-theme-id]`
3. Once connected, make sure your .deploy directory is clean
  - `npm run clean`
4. Then run the first deploy, which builds out a basic scaffolding
  - `npm run deploy`
5. You can now start developing locally with hmr/browsersync
  - `npm start`
  - Opens your shop up in a new tab, with the real domain, and hmr/browsersync enabled..
  - Can still access via localhost:3000, but console might get flooded with errors..
6. When ready to push changes, like css, run `npm run deploy`, which rebuilds and deploys theme.

### Notes
If EADDRINUSE issues:`killall node`
