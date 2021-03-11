const prompts = require('prompts');
const os = require("os");
const inquirer = require('inquirer')
const chalk = require('chalk');
const fs = require('fs');
const shelljs = require('shelljs');

const paths = require('../utils/paths');
const brain = require('../utils/butlerBrain');
const githubApi = require('../services/githubApi');

const { username } = os.userInfo()
const log = console.log;
let brainData = null

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
      validate: value => {
        if (value) {
          return true
        } else {
          return 'Nome do mordomo é obrigátorio*'
        }
      },
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
  let userPreferences = {
    butlerName: user.butlerNick || 'Mordomo',
    userName: user.nick || username,
  }

  shelljs.exec(`mkdir ${paths.butlerPATH()} >> /dev/null`).stdout

  fs.writeFile(`${paths.butlerBrainPATH()}`, JSON.stringify(userPreferences), (err) => {
    if (err) throw err;

    log(chalk.green(`Acabei de criar um arquivo chamado "brain.json" em "${paths.butlerBrainPATH()}"\nContendo todas as minhas memórias.`))
    githubInfo()
  });
}

function githubInfo () {
  inquirer
    .prompt([
      {
        name: 'user_name',
        type: 'confirm',
        message: 'Agora preciso do seu nome de usuário do GitHub, poderia me informar?',
      },
    ])
    .then(response => {
      if (response) {
        getGithubCredentials()
      }
    })
}

function getGithubCredentials () {
  inquirer
    .prompt([
      {
        name: 'github_user_name',
        type: 'input',
        message: 'Digite o seu nome de usuário:',
        validate: value => {
          if (value) {
            return true
          } else {
            return 'Nome de usuário não pode ser vazio'
          }
        },
      },
    ])
    .then(async response => {
      try {
        const githubApiResponse = await githubApi.get(`/users/${response.github_user_name}`)
      
        if (githubApiResponse.status === 200 && githubApiResponse.data.type === 'User') {
          registerGithubInfoOnBrain(githubApiResponse.data)
        } else {
          getGithubCredentials()
        }  
      } catch (error) {
        console.log(chalk.green(`Não encontrei nenhum usuário com esse nome "${response.github_user_name}", por favor digite novamente.`))
        getGithubCredentials()
      }
    });
}

function registerGithubInfoOnBrain (data) {
  inquirer
    .prompt([
      {
        name: 'user_name',
        type: 'confirm',
        message: `Seu nome registrado no Github é ${data.name}, empresa ${data.company}, localização ${data.location}?`,
      },
    ])
    .then(response => {
      if (response) {
        brain.addValueInTheBrain('userGithub', data)

        console.log(chalk.green(`As informações foram salvas ${brainData.userName}`))
      } else {
        console.log(chalk.green('Deve haver algum engano, por favor digite o nome de usuário novamente.'))
        getGithubCredentials()
      }
    })
}

module.exports = hello;