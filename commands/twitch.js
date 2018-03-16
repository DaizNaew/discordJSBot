const   fs = require('fs'),
        embed = require('../model/embeds'),
        log = require('../enum/consoleLogging');

exports.run = (client, message) => {

    message.channel.send('Fetching Twitch link..')
    .then( msg => {
        
        //const defTwitch = JSON.parse(fs.readFileSync("./storage/defaultTwitch.json", "utf8"));
        //const twitchLink = defTwitch[message.guild.name];
        //msg.edit(`Come watch at: ${twitchLink.defaultTwitch}`);
        /*
        msg.edit(embed.RichEmbed(
            ["Author"],
            "title",
            ['Field of strings Title','Field of strings desc','second row title','second row descriptstion'],
            "0x000000",
            null,
            null,
            'https://i.imgur.com/wy9kt6e.png'
        ));
        */
       msg.edit(embed.Embed(

        ['AuthorName','https://i.imgur.com/wy9kt6e.png']

       ));

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
