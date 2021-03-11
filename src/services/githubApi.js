const axios = require('axios')

const apiURL = 'https://api.github.com/'

const api = axios.create({
  baseURL: apiURL,
})

module.exports = api