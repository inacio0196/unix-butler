const weatherApi = require('../services/weatherApi');
const shelljs = require('shelljs')
const log = console.log
const chalk = require('chalk')
const Configstore = require('configstore');

const store = new Configstore('unix-butler', {});
const username = store.get('userName')

function renderWeatherInfo (data) {
  const {
    temp,
    date,
    time,
    description,
    city_name,
    currently,
    humidity,
    sunset,
    sunrise,
  } = data.results

  shelljs.exec('echo "Localidade Data Hora Temperatura Clima Periodo Humidade Nascer-doSol Por-do-Sol" >> /tmp/weather.txt')
  shelljs.exec(`echo "${city_name} ${date} ${time} ${temp} ${description} ${currently} ${humidity} ${sunrise.replace(/\s/g, '')} ${sunset.replace(/\s/g, '')}" >> /tmp/weather.txt`)
  log(chalk.green(`Eis a previão do tempo para hoje, ${username}.\n`))
  shelljs.exec('column -t /tmp/weather.txt')
  shelljs.exec('rm /tmp/weather.txt')

  const forecastWeek = data.results.forecast.map(forecast => ({
    weekDayName: forecast.weekday,
    weekDayDate: forecast.date,
    climate: forecast.description,
  }))

  log(chalk.green(`E também para os próximos dias.\n`))

  forecastWeek.forEach(forecast => {
    log(`${forecast.weekDayName} ${forecast.weekDayDate}`)
    log(`Clima: ${forecast.climate}\n`)
  })
}

module.exports = {
  previsao: async () => {
    const response = await weatherApi('/')

    if (response.data) {
      const forecast = response.data
      renderWeatherInfo(forecast)    
    }
  },
}
