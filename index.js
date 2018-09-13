'use strict';

const { SilexServer, DefaultConfig } = require('silex');
const config = new DefaultConfig();
const CustomProvider = require('./custom-provider');

config.publisherOptions.skipProviderSelection = true;
config.publisherOptions.enableGithubPages = false;
console.log('publisher config:', config.publisherOptions);

// hardcode for test, should be in env vars
config.ceOptions.githubClientId = 'be5c0bfaa1c0438074c7';
config.ceOptions.githubClientSecret = '7b456fec8e1dd9874b8573b703cc44b693a27d89';
console.log('cloud explorer config:', config.ceOptions);

const silex = new SilexServer(config);
//silex.unifile.use(new CustomService());
silex.app.use(new CustomProvider(silex.unifile));

silex.start(function() {
  console.log('server started');
});
