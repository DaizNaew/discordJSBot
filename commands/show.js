        //NodeJS modules
const   _ = require('lodash'),
        m = require('chalk'),
        {Util} = require('discord.js'),
        //Local files
        log = require('../enum/consoleLogging'),
        embed = require('../model/embeds');
        

exports.run = (client, message) => {
    message.channel.send('Fetching...', {code: 'asciidoc'})
    .then(msg => {
        const clientLog = require('../storage/clientLog.json');
        msg.edit(showUserLog(message, clientLog), {code: 'asciidoc'});
    })
    .catch(error => {
        message.channel.send('Something went wrong inside me. 😞 : \n '+ error);
        log.error(`Show command failed to execute [${error}]`);
    });
}

exports.conf = {
    enabled: true,
    guildOnly: true,
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

        log(`Show command used by ${m.cyan.bold(message.author.tag)} to show data about: ${m.cyan.bold(userToShow.user.tag)} in ${m.cyan.bold(message.channel.name)} on ${m.cyan.bold(message.guild.name)}`);

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

        if(clientLog[guildName][id]) {
            let avatar = userToShow.user.avatarURL;
            response = `I have a log on this person : ${clientLog[guildName][id].usertag}`;
            message.author.send(
                embed.RichEmbed(
                    null,
                    clientLog[guildName][id].usertag,
                    ['Server Name', Util.escapeMarkdown(guildName),false,
                    'isBot',clientLog[guildName][id].clientisbot,true,
                    'Amount of sent messages',clientLog[guildName][id].messagesSent,true,
                    'Highest role on server',arr.name,true,
                    'Role ID', arr.id,true],
                    userToShow.displayHexColor,
                    ['User created at: ' + clientLog[guildName][id].usercreatedate],
                    null,
                    null,
                    userToShow.user.avatarURL
                )
            ).then(msg => log(`Sent Message to: ${m.cyan.bold(message.author.tag)}`)).catch(console.error);

        } else {
            response = `I cannot find this person in my records. 😞`;
        }
            return response;
    }
    