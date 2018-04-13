const _ = require('lodash'),
      log = require('../enum/consoleLogging'),
      m = require('chalk');

exports.run = (client, message, params, command_success, command_fail) => {
    let canManageMessages = message.member.permissions.has("MANAGE_MESSAGES", true);
    if(!canManageMessages) {message.react('🔒'); return message.channel.send("I believe you don't have the power to do this.");}

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

        if(!_.includes(adminIDs,message.author.id)) {
            log(`Clear command tried to be used by ${m.cyan.bold(message.author.tag)} to clear ${m.cyan.bold(messagecount)} ${more_than_one_message ? 'messages' : 'message'} in ${m.cyan.bold(message.channel.name)} on ${m.cyan.bold(message.guild.name)}`);
            return message.channel.send("You do not have permission to use this command");
        }

        message.channel.bulkDelete(msg)
        .then(function() {
            let more_than_one_message = false;
            if(messagecount > 1) more_than_one_message = !more_than_one_message;
            log.warning(`Cleared ${m.cyan.bold(messagecount)} ${more_than_one_message ? 'messages' : 'message'} in ${m.cyan.bold(message.channel.name)} on ${m.cyan.bold(message.guild.name)}`);
            message.channel.send(`Deleted: ${messagecount} messages.👌`)
            .then(msg => {
                setTimeout(function(){
                    msg.delete();
                }, 1750);
                
            })
            .catch(error => {
                log.error(`Failed to delete my own message [${error}]`);
                message.channel.send('Could not find my own message anymore 😞 : \n' + error);
            });
        })
        .catch(error => {
            message.channel.send(`Command Failed:: ${error}`, {code:'asciidoc'});
            message.react(command_fail);
            log.error(error);
        });
        
    })
    .catch(error => {
        log.error(`Failed to delete messages [${error}]`);
        message.react(command_fail);
        message.channel.send(`Something doesn't feel quite right. 😞 : \n `+ error);
    });
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['purge'],
    permLevel: 0
}

exports.help = {
    name: 'clear',
    description: 'Clears <n> messages in the current chat, informs the users, then deletes its own message',
    usage: 'Clear <n>'
}