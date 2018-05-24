        //Local Files
const   log = require('../enum/consoleLogging'),
        func = require('../func/propFunctions'),
        //NodeJS Modules
        m = require('chalk'),
        _ = require('lodash');

exports.run = (client, message, params, command_success, command_fail) => {
    if(!params[0]) return message.channel.send('I could not count any words to clap for');
    emojilist = func.readFromFileSync('./storage/emojilist.json');
    //let input = params.slice(0).join(emojilist['emojilist'][_.random(emojilist['emojilist'].length)]);
    let input = "";
    params.forEach(element => {
        input += element + emojilist['emojilist'][_.random(emojilist['emojilist'].length)];
    });
    message.channel.send('Counting words...')
    .then(msg => {
        message.delete();
        msg.edit(input)
    })
    .catch(err => {
        log.error(err);
    })
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
}

exports.help = {
    name: 'emojisay',
    description: 'Outputs a say in an anoying fashion',
    usage: 'emojisay <input>'
}