'use strict';

const NAME = 'user-dir';
const { FsConnector } = require('unifile');

/**
 * Service connector extends the local filesystem connector (unifile-fs)
 * The root URL will depend on the user name, i.e. in ${ rootUrl }/${ session.user }/
 */
class UserDir extends FsConnector {
	/**
   * @constructor
   * @param {Object} config - Configuration object
   * @param {string} config.redirectUri - URI of the login page
   * @param {string|Array<string>} [config.sandbox] - Restrict connector access to this path (if string)
   * or these paths (if array)
   * @param {string} [config.rootPath] - Path against all relative paths will be resolved.
   * Default to the first sandbox path if given or /.
   * @param {boolean} [config.showHiddenFiles=false] - Flag to show hidden files.
   * @param {ConnectorStaticInfos} [config.infos] - Connector infos to override
   * @throws {Error} Invalid sandbox path.
   */
	constructor(config) {
    super(config);
		if(!config || !config.redirectUri)
			throw new Error('You should at least set a redirectUri for this connector');
    this.redirectUri = config.redirectUri;
    this.name = 'custom-service';
    this.infos.name = 'custom-service';
    this.infos.displayName = 'Custom Service disaplay name';
    this.infos.description = 'Custom Service description';
	}

	//Auth commands

  getInfos(session) {
		return Object.assign({
			isLoggedIn: !!session.user,
			isOAuth: false,
			username: session.user
		}, this.infos);
	}

  getAuthorizeURL(session) {
    return Promise.resolve(this.redirectUri);
	}

  login(session, loginInfos) {
    // TODO: insert here the authentication login
    Object.assign(session, loginInfos);

    // FIXME: this is just for the test
    // create the user's dir
    return this.mkdir(session, '')
    .then(() => this.mkdir(session, 'Website'))
    .catch((e) => session)
    // return Promise.resolve(session);
	}

	//Filesystem commands

	readdir(session, path) {
    return super.readdir(session, `${ session.user }/${ path }`);
	}

	stat(session, path) {
    return super.stat(session, `${ session.user }/${ path }`);
	}

	mkdir(session, path) {
    return super.mkdir(session, `${ session.user }/${ path }`);
	}

	writeFile(session, path, data) {
    return super.writeFile(session, `${ session.user }/${ path }`, data);
	}

	createWriteStream(session, path) {
    return super.createWriteStream(session, `${ session.user }/${ path }`);
	}

	readFile(session, path) {
    return super.readFile(session, `${ session.user }/${ path }`);
	}

	createReadStream(session, path) {
    return super.createReadStream(session, `${ session.user }/${ path }`);
	}

	rename(session, src, dest) {
    return super.rename(session, src, dest);
	}

	unlink(session, path) {
    return super.unlink(session, `${ session.user }/${ path }`);
	}

	rmdir(session, path) {
    return super.rmdir(session, `${ session.user }/${ path }`);
	}

	batch(session, actions, message) {
    return super.batch(session, actions, message);
	}
}

module.exports = UserDir;
