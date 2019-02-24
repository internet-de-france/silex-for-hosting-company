## An example of use of Silex website builder

Note: in Silex, these are some useful terms to know

* unifile service: this means a "storage" displayed in the file explorer, where you can save or load your websites or images, e.g. "Dropbox"
* hosting provider: this means an "option" to publish your website, which is displayed in the list when you publish your website, e.g. "Github Pages"
* component: they are listed in the "+" menu, e.g. "interactive map" component

This is how you are supposed to customize Silex:

1- In `index.js` you can

* change the config (default hosting providers and unifile services)
* add custom hosting providers and unifile services

2- In the `components/` you can add components

### Test this 100% online

You can deploy Silex for free without leaving the browser thanks to heroku. Then you can customize Silex from the browser in Github, just for testing purpose.

Fork this repository

Deploy on heroku
[![Folow this link for 1 click deploy to heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

### Test this on your computer

Clone this repo and then

```
$ nvm i
$ npm run build
$ npm start
```

### Add custom components

Look at the components `.yml` and `.ejs` files. Create your own component by adding a pair of `.yml` and `.ejs` files. It will trigger a deploy to heroku.

[Doc about the components](https://github.com/silexlabs/Prodotype/blob/master/README.md)

### Integrate Silex with your infrastructure

Look at the custom hosting provider and how it is added to Silex:

```
silex.app.use(new CustomProvider(silex.unifile));
```

Same thing for custom unifile service:

```
silex.unifile.use(new CustomService({
  redirectUri: config.ceOptions.rootUrl + '/custom-service/signin-custom',
  sandbox: '/tmp/'
}));
```

Notes:
* you can add unifile services, and then use them to provide hosting to your Silex users.
* if Silex sees only one unifile service and one hosting provider, the user will not see the other choices and the user experience will be like with proprietary website builders where hosting is provided only by the company.
