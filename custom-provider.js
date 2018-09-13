const express = require('express');

module.exports = function(unifile) {
  // create a router to return
  const router = express.Router();
  // add my options to the list of hosting providers
  router.get('/hosting/', (req, res, next) => {
//    req.session = req.session || {};
//    req.session.unifile = req.session.unifile || {};
    res.locals.providers = res.locals.providers || [];
    const infos = unifile.getInfos(req.session.unifile, 'github');
    const options = {
      name: 'custom-provider',
      displayName: 'Custom provider based on github',
      isLoggedIn: infos.isLoggedIn,
      username: infos.username,
      authorizeUrl: '/ce/github/authorize',
      dashboardUrl: 'https://www.custom-provider.com/projects',
      pleaseCreateAVhost: 'create a new project.',
      vhostsUrl: '/hosting/custom/vhost',
      buyDomainUrl: 'https://www.custom-provider.com/domains',
      skipVhostSelection: true,
      afterPublishMessage: 'Thx for using our service.<br><br><strong>The deployment to a live website may take a few minutes, be patient!</strong>',
    };
    res.locals.providers.push(options);
    next();
  });
  // add my callbacks to the router
  router.get('/hosting/custom/vhost', (req, res, next) => {
    // for the test, only one vhost which is a hardcoded repo in github
    const name = 'custom-provider';
    function sendResult() {
      res.json([{
        name: name,
        skipDomainSelection: true, // no domain here to make it simple
        publicationPath: {
          name: 'gh-pages',
          folder: name,
          path: `${ name }/gh-pages`,
          service: 'github',
          url: `https://${ req.session.unifile.github.account.login }.github.io/${ name }/`,
        }
      }]);
    }
    unifile.readdir(req.session.unifile, 'github', '/' + name)
      .then(result => {
        // the hardcode folder exists
        sendResult();
      })
      .catch(err => {
        // the hardcode folder does not exist
        unifile.mkdir(req.session.unifile, 'github', '/' + name)
          .then(result => {
            sendResult();
          })
          .catch(err => {
            // the hardcode folder does not exist
            res.status(400).send({
              message: `Before publishing you need to <a target="_blank" href="https://github.com/new">create a repository named ${ name }</a>.`,
              err: err,
            });
          });
      });
  });
  return router;
};
