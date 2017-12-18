var _ = require("lodash");
var fp = require("lodash/fp");
const Discord = require("discord.js");
const moment = require('moment');
const { Util } = require('discord.js');

const log = message => { console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`); };

exports.run = (client, message, params) => {
    message.channel.send('Fetching...', {code: 'asciidoc'})
    .then(msg => {
        const clientLog = require('../storage/clientLog.json');
        msg.edit(showUserLog(message, clientLog), {code: 'asciidoc'});
        //console.dir(params);
    })
    .catch(error => {
        message.channel.send('Something went wrong inside me. 😞 : \n '+ error);
    });
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['Show, whois'],
    permLevel: 0
}

exports.help = {
    name: 'show',
    description: 'Show command to show the full log about a user',
    usage: 'show <user>  /Supply no user to check yo self '
}

    function showUserLog(message, clientLog){
        const guildName = message.guild.name;
        const mention =  message.mentions.members.first();
        const author = message.author;
        
        let userToShow;
        let id;
        if(!mention) {
            id = author.id;
            userToShow = message.member;
        } else {
            id = mention.id;
            userToShow = mention;
        }
        var response;

        log(`Show command used by: ${author.tag} to show data about: ${userToShow.user.tag}`);

        const userRolesByID = userToShow._roles;
        const index = message.guild.roles;
        let rollePos = 0;
        let arr;

        userRolesByID.forEach(roleIDs => {
            index.forEach(element => {
                if(element.id === roleIDs) {
                    if(rollePos <= element.position) rollePos = element.position;
                }
            });
        });

        index.forEach(element => {
            if(element.position === rollePos) arr = _.merge(element, arr);
            });

        const embed = new Discord.RichEmbed();

        if(clientLog[guildName][id]) {

            embed.setColor(userToShow.displayHexColor);
            embed.setTitle(clientLog[guildName][id].usertag);
            embed.setThumbnail(userToShow.user.avatarURL);
            embed.addField('Server Name', Util.escapeMarkdown(guildName), false);
            embed.addField('isBot', clientLog[guildName][id].clientisbot, true );
            embed.addField('Amount of sent messages',clientLog[guildName][id].messagesSent, true )
            embed.addField('Highest role on server',arr.name, true);
            embed.addField('Role ID', arr.id, true);
            embed.setFooter('User created at: ' + clientLog[guildName][id].usercreatedate);

            response = `I have a log on this person : ${clientLog[guildName][id].usertag}`;

            message.author.send(({embed})).then(msg => log(`Sent Message to: ${message.author.tag}`)).catch(console.error);

        } else {
            response = `I cannot find this person in my records. 😞`;
        }
            return response;
    }
    