const clientLog = require('../storage/clientLog.json');

exports.run = (client, message, params) => {
    message.channel.send('Fetching...')
    .then(msg => {
        msg.edit(showUserLog(message, clientLog));
        console.dir(params);
    })
    .catch(error => {
        message.channel.send('Der gik noget galt inde i mig. :(: '+ error);
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

    function showUserLog(message, params, clientLog){
        let mention =  message.mentions.members.first();
        let author = message.author;
        let id;
        if(!mention) {
            id = author.id;
        } else {
            id = mention.id;
        }
        var response;
            //showEmbed(clientLog[id].usertag, message);
            console.log(`Show command used by: ${author.id} to show data about: ${id}`);
            if(clientLog[id]) {
                response = `Jeg har en log på denne person : ${clientLog[id].usertag}`;
                message.author.send(`${clientLog[id].usertag} Blev oprættet: ${clientLog[id].usercreatedate} med disse stats:
                \nNavn på serveren: ${clientLog[id].firstNick} 
                Om bot eller ej: ${clientLog[id].clientisbot} 
                Har sendt: ${clientLog[id].messagesSent} beskeder
                Har kicket: ${clientLog[id].kickhammer} brugere, og bannet: ${clientLog[id].banhammer} brugere`)
                .then(message => console.log(`sent Message: ${message.content}`))
                .catch(console.error);
            } else {
                response = `Nej, den person kender jeg ikke.`;
            }
            return response;
    }
    