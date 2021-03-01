const weatherApi = require('../services/weatherApi');
var CLI = require('clui'),
    clc = require('cli-color');

var Line          = CLI.Line,
    LineBuffer    = CLI.LineBuffer;

var outputBuffer = new LineBuffer({
  x: 0,
  y: 0,
  width: 'console',
  height: 'console'
});

function renderColumns (data) {
  var message = new Line(outputBuffer)
      .column('Previsão', 20, [clc.green])
      .fill()
      .store()

      var blankLine = new Line(outputBuffer)
        .fill()
        .store()

    var line = new Line(outputBuffer)
      .column((Math.random()*100).toFixed(3), 20)
      .column((Math.random()*100).toFixed(3), 20)
      .column((Math.random()*100).toFixed(3), 20)
      .column((Math.random()*100).toFixed(3), 11)
      .fill()
      .store()

    outputBuffer.output();
}

module.exports = {
  previsao: async () => {
    const response = await weatherApi('/')

    if (response.data) {
      const forecast = response.data
      console.log(forecast)
      renderColumns(forecast)    
    }
  },
}
