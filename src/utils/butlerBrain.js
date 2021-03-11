const fs = require('fs');
const paths = require('./paths');

function getBrainValues () {
  try {
    const brain = fs.readFileSync(paths.butlerBrainPATH(), 'utf8');

    if (brain) {
      return JSON.parse(brain)
    }

    return null
  } catch (error) {
    console.log('Error:', error.stack);
  }
}

function saveBrainEditions (newBrain) {
  fs.writeFile(`${paths.butlerBrainPATH()}`, JSON.stringify(newBrain), error => { if (error) throw error })
}

module.exports = {
  getBrain: () => {
    const brain = getBrainValues()
    
    return brain
  },
  addValueInTheBrain: (key, value) => {
    const addedValue = true
    const valueNotAdded = false
    
    if (!key || !value) {
      throw new Error('need key and value')
    }

    let brain = getBrainValues()

    if (brain) {
      brain = {
        ...brain,
        [key]: value,
      }
    }

    saveBrainEditions(brain)

    return brain[key] ? addedValue : valueNotAdded
  },
  removeValueInTheBrain: (key) => {
    if (!key) {
      throw new Error('need key')
    }

    const brain = getBrainValues()

    if (brain) {
      delete brain[key]
    }

    saveBrainEditions(brain)

    return brain[key] ? addedValue : valueNotAdded
  },
}