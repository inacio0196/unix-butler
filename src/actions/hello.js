const prompts = require('prompts');
const os = require("os");
const chalk = require('chalk');
const Configstore = require('configstore');

const { username } = os.userInfo()
const log = console.log;

const store = new Configstore('unix-butler', {});

async function hello () {
  log(chalk.green(
    `Bem-Vindo ${username}`
  ))

  renderQuetions()
}

async function renderQuetions () {
  const questions = [
    {
      type: 'text',
      name: 'nick',
      message: 'Diga-me seu apelido.',
      validate: value => {
        if (value) {
          return true
        } else {
          return 'Seu apelido é obrigatório*'
        }
      },
    },
    {
      type: 'text',
      name: 'butlerNick',
      message: 'Acabei de nascer por isso não tenho um nome ainda, você poderia me batizar?\nÓtimo! Como gostaria de me chamar?',
    }
  ];

  prompts(questions)
    .then(response => {
      log(chalk.green(
        `Show ${response.nick || username}
        \n${response.butlerNick} é um bom nome!
        \nPor mais que seja ridículo eu gostei.`
      ))
      
      saveUser(response)
    })
}

function saveUser (user) {
  const userPreferences = {
    butlerName: user.butlerNick || 'Mordomo',
    userName: user.nick || username,
    userAge: user.age || 0
  }

  store.set('butlerName', userPreferences.butlerName)
  store.set('userName', userPreferences.userName)
  store.set('firstUseComplete', true)
}

module.exports = hello;