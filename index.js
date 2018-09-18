'use strict';

const { SilexServer, DefaultConfig } = require('silex');
const config = new DefaultConfig();
const CustomProvider = require('./custom-provider');

config.publisherOptions.skipProviderSelection = true;
config.publisherOptions.enableGithubPages = false;

const silex = new SilexServer(config);
//silex.unifile.use(new CustomService());
silex.app.use(new CustomProvider(silex.unifile));

silex.start(function() {
  console.log('server started');
});
