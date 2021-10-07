## An example of use of Silex website builder

In Silex, these are some useful terms to know, please read this wiki page to know what we are talking about: [Silex vocabulary](https://github.com/silexlabs/Silex/wiki/Silex-vocabulary)


### About this repository

This repository shows you how [Silex open source website builder](https://www.silex.me) can be customized for companies selling hosting or integrating Silex with a proprietary SaaS solution.

This demo shows how to integrate Silex to you infrastructure and offer a user experience close to the "usual" website builder, where the user can load/save from your hosting and publish to your server

With this customized instance of Silex:

* you user will not be proposed cloud storage such as Dropbox or Github
* all the files will be store on the server's file system, in the user's directory
* your user will not be proposed to publish in a folder, the website will allways be published in the user's "Website/" folder
* there is a custom login mechanism which you are supposed to customize for real life use, see bellow

### Run this custom instance of Silex

#### 100% online with heroku

You can deploy Silex for free without leaving the browser thanks to heroku. Then you can customize Silex from the browser in Github, just for testing purpose.

Fork this repository

Deploy on heroku
[![Folow this link for 1 click deploy to heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

With this method you can test adding templates, components and changing unifile config without leaving the browser, without any local instal.

#### Local installation

Clone this repo with git and then run Silex

```
$ nvm i
$ npm run build
$ npm start
```

### Add custom components and custom templates

This will probably be useful to you if you want to customize Silex:

* [customize silex templates on the dashboard, see this project](https://github.com/silexlabs/custom-silex-templates)
* [customize silex components in the + menu, see this project](https://github.com/silexlabs/custom-silex-components)
* [Single site mode](https://github.com/silexlabs/custom-silex-components)

### Integrate Silex with your infrastructure

#### Provide a cloud storage

![customize silex add service](https://user-images.githubusercontent.com/715377/53307104-96386080-385a-11e9-8e5a-492acbd641df.gif)

You can let your users store their work (html and image files) on your server:

```
silex.unifile.use(new CustomService({
  redirectUri: config.ceOptions.rootUrl + '/custom-service/signin-custom',
  sandbox: '/tmp/'
}));
```

This unifile service is defined in [`custom-service.js`](./custom-service.js) and contains a method where you can define your custom authentication mechanism:

```
  login(session, loginInfos) {
    // TODO: insert here the authentication login
    Object.assign(session, loginInfos);

    // FIXME: this is just for the test
    // create the user's dir
    this.mkdir(session, '');

    return Promise.resolve(session);
	}
```

Notes:
* you can add unifile services, and then use them to provide hosting to your Silex users
* if Silex sees only one unifile service and one hosting provider, the user will not see the other choices and the user experience will be like with proprietary website builders where hosting is provided only by the company.


#### Provide hosting to your users

![customize silex add hosting provider](https://user-images.githubusercontent.com/715377/53307103-96386080-385a-11e9-944d-846cbf950951.gif)

Look at the custom hosting provider and how it is added to Silex:

```
silex.publishRouter.addHostingProvider(new CustomProvider(silex.unifile))
```


