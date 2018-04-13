const m = require('chalk'),
      log = require('../enum/consoleLogging'),
      func = require('../func/propFunctions'),
      fs = require('fs');

exports.run = (client, message, params, command_success, command_fail) => {
    if(!params[0]) return message.channel.send('You need to actually suggest something');
    let suggestionBox = JSON.parse(fs.readFileSync("./storage/suggestionBox.json", "utf8"));
    let input = params.slice(0).join(" ");
    message.channel.send('Logging your suggestion...')
    .then(msg => {
        defChan = require('../storage/defaultChannel.json')
        let suggest_channel_1 = client.channels.get(defChan['DBot'].requestsChannel);
        suggest_channel_1.send(`${message.author.tag} suggested :: ${input}`, {code:'asciidoc'});
        msg.edit('Your suggestion has been logged, thank you.');
        log(`${m.cyan.bold(input)} were suggested by ${m.cyan.bold(message.author.tag)}`);
        length = Object.keys(suggestionBox).length;
        if(!suggestionBox[length]) {
            suggestionBox[length] = {
                user: message.author.tag,
                suggestion : input 
            }
        }
        func.writeToFileAsync('./storage/suggestionBox.json',func.beautifyJSON(suggestionBox) );
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
    aliases: ['request'],
    permLevel: 0
}

exports.help = {
    name: 'suggest',
    description: 'Adds a suggestion to the bot, please be reasonable',
    usage: 'suggest <suggestion>'
}