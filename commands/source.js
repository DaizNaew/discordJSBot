const Discord = require('discord.js');

exports.run = (client, message) => {

    message.channel.send("Fetching Sources...")
    .then(msg => {

        msg.edit(`Source can be found on my github over at: https://github.com/DaizNaew/discordJSBot`)
        
    })
    .catch(error => {
        message.channel.send('Something went wrong inside me. 😞 : \n '+ error);
    });
}

exports.conf = {
   enabled: true,
   guildOnly: false,
   aliases: ['Source', 'Github', 'github'],
   permLevel: 0
}

exports.help = {
   name: 'source',
   description: 'Gives a link to the source of this bot',
   usage: 'source'
}
