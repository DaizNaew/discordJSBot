exports.run = (client, message, params) => {
    const messagecount = parseInt(params.join(' '));
    message.channel.fetchMessages({
        limit:messagecount+1
    })
    .then(msg => {

        message.channel.bulkDelete(msg);
        message.channel.send(`Deleted: ${messagecount} messages.👌`)
        .then(msg => {
            setTimeout(function(){
                msg.delete();
            }, 5000);
            
        })
        .catch(error => {
            console.log('Could not find my own message anymore 😞 : \n' + error);
        });
    })
    .catch(error => {
        message.channel.send('Something went wrong in me belly. 😞 : \n '+ error);
    });
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['clear','purge','Purge'],
    permLevel: 2
}

exports.help = {
    name: 'Clear',
    description: 'Clears <n> messages in the current chat, informs the users, then deletes its own message',
    usage: 'Clear <amount>  where amount is between 1 and 25 for now'
}
    