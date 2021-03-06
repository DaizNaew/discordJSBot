        //Local Files
const   log = require('../enum/consoleLogging'),
        func = require('../func/propFunctions'),
        //NodeJS Modules
        m = require('chalk');
      
exports.run = (client, message, params, command_success, command_fail) => {
    if(!params[0]) return message.channel.send('You need to actually suggest something');
    let suggestionBox = func.readFromFileSync("./storage/suggestionBox.json", "utf8");
    let input = params.slice(0).join(" ");
    message.channel.send('Logging your suggestion...')
    .then(msg => {
        defChan = require('../storage/defaultChannel.json')
        let suggest_channel_1 = client.channels.get(defChan['DBot'].requestsChannel);
        msg.edit('Your suggestion has been logged, thank you.');
        log(`${m.cyan.bold(input)} were suggested by ${m.cyan.bold(message.author.tag)}`);
        suggest_channel_1.send(`${message.author.tag} suggested :: ${input}`, {code:'asciidoc'})
        .then(suggest_message => {
            length = Object.keys(suggestionBox).length;
            if(!suggestionBox[length]) {
                suggestionBox[length] = {
                    user: message.author.tag,
                    suggestion : input,
                    message_id : suggest_message.id
                }
            }
            func.writeToFileAsync('./storage/suggestionBox.json',func.beautifyJSON(suggestionBox) );
            message.react(command_success);
        })
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
    permLevel: 0,
    category: func.getDirForCategory(__dirname)
}

exports.help = {
    name: 'suggest',
    description: 'Adds a suggestion to the bot, please be reasonable',
    usage: 'suggest <suggestion>'
}