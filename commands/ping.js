exports.run = (client, message) => {

     message.channel.send('Pinging...')
    .then( msg => {

        msg.edit(`I have reported a ***${client.ping}*** ms delay to the server.`);
        
    })
    .catch(error => {
        message.channel.send('Something went wrong inside me. 😞 : \n '+ error);
    }); 
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['ping', 'delay'],
    permLevel: 0
}

exports.help = {
    name: 'Ping',
    description: 'Gets the current delay to the discord server from the bot',
    usage: 'Ping'
}
