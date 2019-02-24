'use strict';

const { SilexServer, DefaultConfig } = require('silex');
const config = new DefaultConfig();
const CustomProvider = require('./custom-provider');
const CustomService = require('./custom-service');

// provide only our custom hosting to user when they want to publish
config.publisherOptions.skipProviderSelection = true;

// prevent default option of SFTP
// provide only our custom service to our users
config.ceOptions.enableSftp = false;

const silex = new SilexServer(config);

// custom hosting provider
silex.app.use(new CustomProvider(silex.unifile));

// custom unifile service
silex.unifile.use(new CustomService({
  redirectUri: config.ceOptions.rootUrl + '/custom-service/signin-custom',
  sandbox: '/tmp/'
}));

// define a form to get the user login and password
silex.app.use('/ce/custom-service/signin-custom', (req, res) => {
  res.send(`
<form action="/ce/custom-service/login_callback" method="post" accept-charset="utf-8">
  <h1>Unifile would like access to your files and folders.</h1>
  <div>
    <label for="user">username</label>
    <input type="text" name="user" placeholder="user" id="user">
  </div>
  <div>
    <label for="password">password</label>
    <input type="password" name="password" id="password">
  </div>
  <div>
    <input type="submit" name="submit" value="Log in" id="submit">
  </div>
</form>
  `);
})

silex.start(function() {
  console.log('server started');
});
