        //Local Files
const   log = require('../enum/consoleLogging'),
        func = require('../func/propFunctions'),
        //NodeJS Modules
        m = require('chalk'),
        _ = require('lodash');

exports.run = (client, message, params, command_success, command_fail) => {
    if(message.guild) {
        rudeboi = _.find(message.guild.members.array(), ['id','387616895484035072']);
        if(rudeboi != undefined) {
            message.channel.send(`${rudeboi}? He's like the rudest boi around, better watch yourself around him, he's vicious and will most likely nibble off your ear flaps.`);
        } else {
            message.channel.send('I do not recall anyone with that name around these parts, You might be asking the wrong bot.');
        }
    }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
    category: func.getDirForCategory(__dirname)
}

exports.help = {
    name: 'rudeboi',
    description: 'Let me tell you about this bot I know.',
    usage: 'rudeboi'
}

