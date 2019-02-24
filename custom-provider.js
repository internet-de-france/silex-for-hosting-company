module.exports = function(unifile) {
  this.unifile = unifile;
};

module.exports.prototype.getOptions = function(session) {
  const infos = this.unifile.getInfos(session, 'custom-service');
  return {
    name: 'custom-provider',
    displayName: 'Custom provider based on custom-service',
    isLoggedIn: infos.isLoggedIn,
    username: infos.username,
    authorizeUrl: '/ce/custom-service/authorize',
    dashboardUrl: 'https://www.custom-provider.com/projects',
    pleaseCreateAVhost: 'create a new project.',
    vhostsUrl: '/hosting/custom-provider/vhost',
    buyDomainUrl: 'https://www.custom-provider.com/domains',
    skipVhostSelection: true,
    skipFolderSelection: true,
    afterPublishMessage: 'Thx for using our service.<br><br>',
  };
};

const WEBSITE_FOLDER_NAME = 'Website';
module.exports.prototype.getVhosts = async function(session) {
  return [{
    name: WEBSITE_FOLDER_NAME,
    domainUrl: `/hosting/custom-provider/vhost/get`,
    skipDomainSelection: false,
    publicationPath: {
      //absPath: `/ce/github/get/${ WEBSITE_FOLDER_NAME }/gh-pages`,
      name: WEBSITE_FOLDER_NAME,
      folder: WEBSITE_FOLDER_NAME,
      path: `${ WEBSITE_FOLDER_NAME }/`,
      service: 'custom-service',
      url: `https://${ session.user }.your-domain.com/`,
    }
  }];
};

module.exports.prototype.getVhostData = async function(session, vhostName) {
  console.log('getVhostData', session, vhostName);
  try {
    const domain = (await this.unifile.readFile(session, 'custom-service', `/${ WEBSITE_FOLDER_NAME }/CNAME`)).toString();
    console.log('domain is ', domain);
    return {
      domain: domain,
      url: `https://${ session.user }.your-domain.com/`,
      // status: 'ok?',
    };
  }
  catch(e) {
    console.log('no domain', e);
  }
  return null;
};

module.exports.prototype.setVhostData = async function(session, vhostName, data) {
  console.log('setVhostData', session, vhostName, data);
  try {
    await this.unifile.writeFile(session, 'custom-service', `/${ WEBSITE_FOLDER_NAME }/CNAME`, data.domain);
    console.log('domain is ', domain);
    return this.getVhostData(session, vhostName);
  }
  catch(e) {
    console.log('no domain', e);
  }
  return null;
};

module.exports.prototype.finalizePublication = function(from, to, session, onStatus) {
  return Promise.resolve();
}

module.exports.prototype.getDefaultPageFileName = function() {
  return 'index.html';
};

