const bcrypt = require('bcrypt');

const hello = require('./src/actions/hello');
const manager = require('./src/actions/manager');
const brain = require('./src/utils/butlerBrain');

const hasBrain = brain.getBrain()

if (!hasBrain) {
  console.log('tem')
  // manager.previsao()
} else {
  hello()
}
