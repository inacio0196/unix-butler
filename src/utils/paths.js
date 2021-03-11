const os = require('os');
const { username } = os.userInfo()

module.exports = {
  butlerPATH: () => {
    return `/home/${username}/.unix-butler`
  },
  butlerBrainPATH: () => {
    return `/home/${username}/.unix-butler/brain.json`
  },
}