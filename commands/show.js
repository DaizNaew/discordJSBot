var _ = require("lodash");
var fp = require("lodash/fp");
const Discord = require("discord.js");

exports.run = (client, message, params) => {
    message.channel.send('Fetching...', {code: 'asciidoc'})
    .then(msg => {
        const clientLog = require('../storage/clientLog.json');
        msg.edit(showUserLog(message, clientLog), {code: 'asciidoc'});
        console.dir(params);
    })
    .catch(error => {
        message.channel.send('Something went wrong inside me. 😞 : \n '+ error);
    });
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['Show'],
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
        const embed = new Discord.RichEmbed();
        
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

            console.log(`Show command used by: ${author.id} to show data about: ${id}`);

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
                response = `I have a log on this person : ${clientLog[guildName][id].usertag}`;
                message.author.send(`${clientLog[guildName][id].usertag} Was created at: ${clientLog[guildName][id].usercreatedate} with theese stats:
                \nName on server: ${clientLog[guildName][id].firstNick} 
                If bot or not: ${clientLog[guildName][id].clientisbot} 
                Has sent: ${clientLog[guildName][id].messagesSent} messages
                Has kicked: ${clientLog[guildName][id].kickhammer} users and banned: ${clientLog[guildName][id].banhammer} users
                This user has the top role of: ${arr.name} which has the ID of: ${arr.id}`)
                .then(message => console.log(`sent Message: ${message.content}`))
                .catch(console.error);
            } else {
                response = `I cannot find this person in my records. 😞`;
            }
            return response;
    }
    