const Configstore = require('configstore');
const log = console.log;
const manager = require('./src/actions/manager');
const shelljs = require('shelljs')

const fileUtils = require('./src/utils/fileUtils');

const hello = require('./src/actions/hello');

const store = new Configstore('unix-butler', {});

const firstUseComplete = store.get('firstUseComplete')

  if (firstUseComplete) {
    manager.previsao()
  } else {
    hello()
  }
