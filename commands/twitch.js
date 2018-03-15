const   fs = require('fs');

exports.run = (client, message) => {

    message.channel.send('Fetching Twitch link..')
    .then( msg => {
        const defTwitch = JSON.parse(fs.readFileSync("./storage/defaultTwitch.json", "utf8"));
        const twitchLink = defTwitch[message.guild.name];
        msg.edit(`Come watch at: ${twitchLink.defaultTwitch}`);
    })
    .catch( error => {
        message.channel.send('Something went wrong inside me. 😞 : \n '+ error);
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
