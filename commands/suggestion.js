const m = require('chalk'),
      log = require('../enum/consoleLogging'),
      func = require('../func/propFunctions'),
      fs = require('fs'),
      _ = require('lodash');

exports.run = (client, message, params, command_success, command_fail) => {
    let suggestionBox = JSON.parse(fs.readFileSync("./storage/suggestionBox.json", "utf8"));
    message.channel.send('Getting a suggestion...')
    .then(msg => {

        let suggestion_to_show;
        if(!params[0]) {
            suggestion_to_show = suggestionBox[_.random(Object.keys(suggestionBox).length-1)];
            msg.edit(`${suggestion_to_show.user} suggested :: ${suggestion_to_show.suggestion}`, {code:'asciidoc'});
        } else if(params[0] && params[0] <= Object.keys(suggestionBox).length-1 ) {
            suggestion_to_show = suggestionBox[params[0]];
            msg.edit(`${suggestion_to_show.user} suggested :: ${suggestion_to_show.suggestion}`, {code:'asciidoc'});
        } else if(params[0] === 'total') msg.edit(`Theres a total of ${Object.keys(suggestionBox).length} suggestions in the suggestion box, type suggestion <number> to get a specific suggestion, or just suggestion for a random one`)
        else {
            message.react(command_fail);
            return msg.edit(`You tried to search for suggestion number: ${params[0]} Which doesn't exist in my database`)
        }

        message.react(command_success);
    })
    .catch(err => {
        log.error(`Suggestion module failed with [${err}]`);
        message.react(command_fail);
    })
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['suggestions'],
    permLevel: 0
}

exports.help = {
    name: 'suggestion',
    description: 'Shows a suggestion from the suggestion box',
    usage: 'suggestion <total|[number]|empty for random>'
}