const Configstore = require('configstore');
const log = console.log;

const hello = require('./src/actions/hello');

const store = new Configstore('unix-butler', {});

const firstUseComplete = store.get('firstUseComplete')

  if (!firstUseComplete) {
    hello()
  } else {
    log('Ja registrou')
  }
