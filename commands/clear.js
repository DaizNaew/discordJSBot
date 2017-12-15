const Discord = require('discord.js');

exports.run = (client, message, params) => {
    let canManageMessages = message.member.permissions.has("MANAGE_MESSAGES", true);
    if(!canManageMessages) return message.channel.send("I believe you don't have the power to do this.");
    let messagecount = parseInt(params.join(' '));
    if(!messagecount) messagecount = 1;
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
        message.channel.send(`Something doesn't feel quite right. 😞 : \n `+ error);
    });
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['Clear','purge','Purge'],
    permLevel: 2
}

exports.help = {
    name: 'clear',
    description: 'Clears <n> messages in the current chat, informs the users, then deletes its own message',
    usage: 'Clear <n>'
}
    