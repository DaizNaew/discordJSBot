        //Local Files
const   log = require('../enum/consoleLogging'),
        func = require('../func/propFunctions'),
        //NodeJS Modules
        m = require('chalk');

exports.run = (client, message, params, command_success, command_fail) => {
    if(message.member.id != '128235918418116608') { message.react('🔒'); return message.channel.send('You do not have the required permissions to do this.'); }
    if(!params[0] || !params[1]) { message.react(command_fail); return message.channel.send('Missing a parameter, please consult the help if you need help') }
    suggestionBox = func.readFromFileSync('./storage/suggestionBox.json');
    if(!suggestionBox[params[1]]) { message.react(command_fail); return message.channel.send(`Suggestion #${params[1]} does not exist in my database`)}
    defChan = require('../storage/defaultChannel.json')
    let suggest_channel_1 = client.channels.get(defChan['DBot'].requestsChannel);
    switch(params[0]){
        case('delete'):
        suggest_channel_1.fetchMessage(suggestionBox[params[1]].message_id)
        .then(msg => {
            msg.delete(1000);
        })
        break;
        case('done'):
        suggest_channel_1.fetchMessage(suggestionBox[params[1]].message_id)
        .then(msg => {
            msg.react(command_success);
        })
        break;
        case('undone'):
        suggest_channel_1.fetchMessage(suggestionBox[params[1]].message_id)
        .then(msg => {
            msg.react(command_fail);
        })
    }
    message.react(command_success);
}

exports.conf = {
    enabled: false,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
    category: func.getDirForCategory(__dirname)
}

exports.help = {
    name: 'managesuggest',
    description: 'A random test command',
    usage: 'managesuggest <delete|done|undone> <suggest ID>'
}