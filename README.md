### Set up

1. Make sure you have the latest version of theme kit installed
  - install theme kit `curl -s https://raw.githubusercontent.com/Shopify/themekit/master/scripts/install | sudo python`
2. Connect local env to remote by updating the config.yml, config.js and .env files located here with your unique shop credentials:
  - src/theme/config.yml (update creds per env)
  - config.js (update themeId and shopName)
  - Duplicate the .env.sample and name it .env (update creds for config.js references)
3. You can now start developing locally with hmr/browsersync
  - Run `npm start`
  - Opens your shop up in a new tab, with the real domain, and hmr/browsersync enabled..
  - Can still access via localhost:3000, but console might get flooded with errors..
4. To clean deploy directory: `npm run clean`
5. When ready to push changes, like css, run `npm run deploy`, which rebuilds and deploys theme.

### Notes
- `--nodelete` passed on deploy:production so as to not delete theme settings.
- If EADDRINUSE issues:`killall node`
- Shopify houses two themes, one for dev, one for prod.
- `npm run deploy:prod` pushes changes to prod theme, which you should update both the main.css and main.js includes in theme.liquid and webpack-setup.liquid to point to real assets instead of local.
- `npm run deploy:dev` or `npm start` while deving, comment out css reference, and should point to local for js.
