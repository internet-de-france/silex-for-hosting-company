## An example of use of Silex website builder

### About this repository

This repository shows you how [Silex open source website builder](https://www.silex.me) can be customized to your needs. This will be useful to you if you sell Silex websites, or if you sell hosting.

This demo shows how to

* host a custom instance of Silex, with Silex project imported as an npm dependency (good for Silex updates)
* add components to the "+" menu
* add templates to the list of templates on the dashboard
* integrate Silex to you infrastructure and offer a user experience close to the "usual" website builder, where the user can load/save from your hosting and publish to your server

The last point is important and it means that with this customized instance of Silex

* you user will not be proposed cloud storage such as Dropbox or Github
* all the files will be store on the server's file system, in the user's directory
* your user will not be proposed to publish in a folder, the website will allways be published in the user's "Website/" folder
* there is a custom login mechanism which you are supposed to customize for real life use, see bellow

### Notes

In Silex, these are some useful terms to know

* unifile service: this means a "storage" displayed in the file explorer, where you can save or load your websites or images, e.g. "Dropbox"
* hosting provider: this means an "option" to publish your website, which is displayed in the list when you publish your website, e.g. "Github Pages"
* component: they are listed in the "+" menu, e.g. "interactive map" component

This is how you are supposed to customize Silex:

1- In `index.js` you can

* change the config (default hosting providers and unifile services)
* add custom hosting providers and unifile services

2- In the `components/` you can add components

3- in `templates/` you can add templates

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

### Add custom components

![customize silex add component](https://user-images.githubusercontent.com/715377/53307105-96386080-385a-11e9-8b81-3913a6a07d99.gif)

Look at the components `.yml` and `.ejs` files. Create your own component by adding a pair of `.yml` and `.ejs` files. It will trigger a deploy to heroku.

[Doc about the components](https://github.com/silexlabs/Prodotype/blob/master/README.md)



### Add custom templates


![customize silex add template](https://user-images.githubusercontent.com/715377/53307106-96386080-385a-11e9-9c82-75b1bdd6ac1e.gif)


Look at the templates of [the official repository of templates](https://github.com/silexlabs/silex-templates). They all have 1 folder per template with these files in it: `editable.html`, `index.html`, `screenshot.png`, `README.md` and all the files which are generated when publishing the template with Silex.

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


