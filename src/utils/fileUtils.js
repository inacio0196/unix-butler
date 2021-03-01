const fs = require('fs');
const path = require('path');
const shelljs = require('shelljs')

module.exports = {
  getCurrentDirectoryBase: () => {
    return path.basename(process.cwd());
  },

  getCurrentDirectoryAddress () {
    return shelljs.pwd().stdout
  },

  directoryExists: (filePath) => {
    return fs.existsSync(filePath);
  }
};
