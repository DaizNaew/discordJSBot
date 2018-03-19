const   TwitchGet = require('../func/twitchGetter'),
        log = require('../enum/consoleLogging');

exports.run = (client, message, params) => {

    message.channel.send('Fetching Twitch link..')
    .then( msg => {
        
       if(!params[0]) {TwitchGet(msg,'16964788');} else {TwitchGet(msg, '16964788')}

    })
    .catch( error => {
        message.channel.send('Something went wrong inside me. 😞 : \n '+ error);
        log.error(`Twitch command failed to execute [${error}]`);
    });

}

exports.conf = {
   enabled: true,
   guildOnly: false,
   aliases: ['Twitch', 'stream'],
   permLevel: 0
}

exports.help = {
   name: 'twitch',
   description: 'It does something to twitch, inappropiate most likely',
   usage: 'twitch'
}
