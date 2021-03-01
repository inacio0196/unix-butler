const axios = require('axios');

const apiKey = '4b1d6301'
const city = 'Guaruja'
const uf = 'SP'

const weatherApi = axios.create({
  baseURL: `https://api.hgbrasil.com/weather?key=${apiKey}&city_name=${city},${uf}`
})

module.exports = weatherApi;