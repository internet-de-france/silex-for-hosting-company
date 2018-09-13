'use strict';

const { SilexServer, DefaultConfig } = require('silex');
const config = new DefaultConfig();
const CustomProvider = require('./custom-provider');

config.publisherOptions.skipProviderSelection = true;
config.publisherOptions.enableGithubPages = false;
console.log('publisher config:', config.publisherOptions);

config.ceOptions.githubClientId = "f124e4148bf9d633d58b";
config.ceOptions.githubClientSecret = "1a8fcb93d5d0786eb0a16d81e8c118ce03eefece";
console.log('cloud explorer config:', config.ceOptions);

const silex = new SilexServer(config);
//silex.unifile.use(new CustomService());
silex.app.use(new CustomProvider(silex.unifile));

silex.start(function() {
  console.log('server started');
});
