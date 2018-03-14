const Discord = require('discord.js');

exports.run = (client, message) => {

    message.channel.send("Fetching Developer list...")
    .then(msg => {
        
        const embed = new Discord.RichEmbed();
        
        embed.setTitle('Developer list');
        embed.addField('I were created by these lovely people over at the L&B server', `@DaizNaew - Main Developer \n@THICCBOI - Trusty Partner In Science`, false);
        embed.addField('Special thanks to', 'The Turtle Gaming Community - for ideas and help testing', false);

        msg.edit({embed});
        
        
    })
    .catch(error => {
        message.channel.send('Something went wrong inside me. 😞 : \n '+ error);
    });
    
}

exports.conf = {
   enabled: true,
   guildOnly: false,
   aliases: ['Dev', 'Devs', 'devs', 'credits', 'Credits'],
   permLevel: 0
}

exports.help = {
   name: 'dev',
   description: 'Lists who made this bot',
   usage: 'dev'
}
