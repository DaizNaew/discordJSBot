const log = require('../enum/consoleLogging'),
      func = require('../func/propFunctions'),
      m = require('chalk'),
      _ = require('lodash');

exports.run = (client, message, params, command_success, command_fail) => {
    let suggestionBox = func.readFromFileSync("./storage/suggestionBox.json", "utf8"),
        serverSettings = func.readFromFileSync('./config/serverSettings.json');
    message.channel.send('Getting a suggestion...')
    .then(msg => {

        let suggestion_to_show;

        if(!params[0]) {
            suggestion_to_show = suggestionBox[_.random(Object.keys(suggestionBox).length-1)];
            msg.edit(`${suggestion_to_show.user} suggested :: ${suggestion_to_show.suggestion}`, {code:'asciidoc'});
        } else if(params[0] && params[0] <= Object.keys(suggestionBox).length-1 ) {
            suggestion_to_show = suggestionBox[params[0]];
            msg.edit(`${suggestion_to_show.user} suggested :: ${suggestion_to_show.suggestion}`, {code:'asciidoc'});
        } else if(params[0] === 'total' || params[0] === 'list') {
            msg.edit(`Theres a total of ${Object.keys(suggestionBox).length-1} suggestions in the suggestion box, type ${serverSettings[message.guild.id]['configs'].prefix}suggestion <number> to get a specific suggestion, or just ${serverSettings[message.guild.id]['configs'].prefix}suggestion for a random one
            \nSending a private message with all the suggestions, embrace the spam`);
            temp_response = `== Showing all suggestions ==`;
            for(i = 1; i <= Object.keys(suggestionBox).length-1; i++ ) {
                temp_response += `\n${suggestionBox[Object.keys(suggestionBox).length-i].user} suggested :: ${suggestionBox[Object.keys(suggestionBox).length-i].suggestion}`
            }
            message.author.send(temp_response,{code:'asciidoc'});
        } else if(params[0] === 'latest' || params[0] === 'top') {
            temp_response = `== Showing the 5 latest suggestions ==`;
            for(i = 1; i <= 5; i++ ) {
                temp_response += `\n${suggestionBox[Object.keys(suggestionBox).length-i].user} suggested :: ${suggestionBox[Object.keys(suggestionBox).length-i].suggestion}`
            }
            msg.channel.send(temp_response,{code:'asciidoc'});
        }
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
    guildOnly: true,
    aliases: ['suggestions'],
    permLevel: 0
}

exports.help = {
    name: 'suggestion',
    description: 'Shows a suggestion from the suggestion box',
    usage: 'suggestion <total|[number]|empty for random>'
}