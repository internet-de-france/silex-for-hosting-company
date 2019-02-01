## An example of use of Silex website builder

This is how you are supposed to customize Silex.

### Test this 100% online

You can deploy Silex for free without leaving the browser thanks to heroku. Then you can customize Silex from the browser in Github, just for testing purpose.

Fork this repository

Deploy on heroku
[![Folow this link for 1 click deploy to heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

### Add custom components

Look at the components `.yml` and `.ejs` files. Create your own component by adding a pair of `.yml` and `.ejs` files. It will trigger a deploy to heroku.

[Doc about the components](https://github.com/silexlabs/Prodotype/blob/master/README.md)

### Integrate Silex with your infrastructure

Clone this repo
nvm i
npm run build
npm start

Look at the custom hosting provider and how it is added to Silex. Create your own custom provider and test it on heroku.

Finally there are unifile services which you can add, and then use them to provide hosting to your Silex users. If Silex sees only one unifile service and one hosting provider, the user will not see the other choices and the user experience will be like with proprietary website builders where hosting is provided only by the company.

