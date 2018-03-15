const Discord = require('discord.js'),
      _ = require('lodash');

exports.run = (client, message, params) => {
    let canManageMessages = message.member.permissions.has("MANAGE_MESSAGES", true);
    if(!canManageMessages) return message.channel.send("I believe you don't have the power to do this.");
    let messagecount = parseInt(params.join(' '));
    if(!messagecount) messagecount = 1;
    message.channel.fetchMessages({
        limit:messagecount+1
    })
    .then(msg => {

        let adminIDs = [
            "128235918418116608",
            "124256687992340484",
            "151228724430241792"
        ]

        if(!_.includes(adminIDs,message.author.id)) return message.channel.send("You do not have permission to use this command");

        message.channel.bulkDelete(msg);
        message.channel.send(`Deleted: ${messagecount} messages.👌`)
        .then(msg => {
            setTimeout(function(){
                msg.delete();
            }, 5000);
            
        })
        .catch(error => {
            message.channel.send('Could not find my own message anymore 😞 : \n' + error);
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