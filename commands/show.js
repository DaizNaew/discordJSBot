var _ = require("lodash");
var fp = require("lodash/fp");

exports.run = (client, message, params) => {
    message.channel.send('Fetching...')
    .then(msg => {
        const clientLog = require('../storage/clientLog.json');
        msg.edit(showUserLog(message, clientLog));
        console.dir(params);
    })
    .catch(error => {
        message.channel.send('Der gik noget galt inde i mig. :( : \n '+ error);
    });
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['show'],
    permLevel: 0
}

exports.help = {
    name: 'Show',
    description: 'Show command to show the full log about a user',
    usage: 'Show <user>  /Supply no user to check yo self '
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
                response = `Jeg har en log på denne person : ${clientLog[guildName][id].usertag}`;
                message.author.send(`${clientLog[guildName][id].usertag} Blev oprettet: ${clientLog[guildName][id].usercreatedate} med disse stats:
                \nNavn på serveren: ${clientLog[guildName][id].firstNick} 
                Om bot eller ej: ${clientLog[guildName][id].clientisbot} 
                Har sendt: ${clientLog[guildName][id].messagesSent} beskeder
                Har kicket: ${clientLog[guildName][id].kickhammer} brugere, og bannet: ${clientLog[guildName][id].banhammer} brugere
                Denne bruger har højeste rolle: ${arr.name} som har ID: ${arr.id}`)
                .then(message => console.log(`sent Message: ${message.content}`))
                .catch(console.error);
            } else {
                response = `Nej, den person kender jeg ikke.`;
            }
            return response;
    }
    