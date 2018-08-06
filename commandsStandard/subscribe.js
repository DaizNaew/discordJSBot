        //Local files
const   log = require('../enum/consoleLogging'),
        embed = require('../model/embeds'),
        func = require('../func/propFunctions'),
        //NodeJS modules
        m = require('chalk');

exports.run = (client, message, params, command_success, command_fail) => {

    var role_removed = false;

    message.channel.send("Adding you to the notify list...")
    .then(msg => {

        const subscribeRole = message.member.guild.roles.find('name', 'Notify_List');
        const mention =  message.mentions.members.first();
        var user_to_notify;

        if(mention && message.member.permissions.has("MANAGE_ROLES", true)) {user_to_notify = mention;} else {user_to_notify = message.member;}

        if(subscribeRole) {

            user_to_notify.roles.forEach(element => {

                if(element.id == subscribeRole.id) {
                    msg.edit(embed.Embed(null,null,null,null,null,`**${user_to_notify.user.username}** has been removed from the notification role`))
                    role_removed = true;
                    log(`Unsubscribed ${m.cyan.bold(user_to_notify.user.tag)} on ${m.cyan.bold(message.guild.name)} to ${m.cyan.bold(subscribeRole.name)} by ${m.cyan.bold(message.author.tag)}`);
                    message.react(command_success);
                    return user_to_notify.removeRole(subscribeRole);
                }
            });
        
        user_to_notify.addRole(subscribeRole)
        .then( function() {
            if (!role_removed){msg.edit(embed.Embed(null,null,null,null,null,`**${user_to_notify.user.username}** has been added to the notification role`));
            log(`Subscribed ${m.cyan.bold(user_to_notify.user.tag)} on ${m.cyan.bold(message.guild.name)} to ${m.cyan.bold(subscribeRole.name)} by ${m.cyan.bold(message.author.tag)}`);}
            message.react(command_success);
        })
        .catch(error => {
            log.error(`Subscribe command failed to execute [${error}]`);
            message.react(command_fail);
        });
        } else {
            user_to_notify.guild.createRole({
                name: 'Notify_List',
                color: 'GREY',
                mentionable: true,
                hoist: true,
            })
            .then(role => {
                log.warning(`Created new role with name ${role.name} and color ${role.color}`);
                msg.edit(embed.Embed(null,null,null,null,null,`Created a new role to suit your needs, adding you to it now`));
                setTimeout(function(){
                    user_to_notify.addRole(role);
                    msg.edit(embed.Embed(null,null,null,null,null,`**${user_to_notify.user.username}** has been added to the notification role`));
                },500);
                log(`Subscribed ${m.cyan.bold(user_to_notify.user.tag)} on ${m.cyan.bold(message.guild.name)} to ${m.cyan.bold(role.name)} by ${m.cyan.bold(message.author.tag)}`);
                message.react(command_success);
            })
            .catch(error => { message.react(command_fail); log.error(error)});
        }
    })
    .catch(error => {
        message.channel.send('Something went wrong inside me. 😞 : \n '+ error);
        log.error(`Subscribe command failed to execute [${error}]`);
        message.react(command_fail);
    });
}

exports.conf = {
   enabled: true,
   guildOnly: true,
   aliases: ['notify'],
   permLevel: 0,
   category: func.getDirForCategory(__dirname)
}

exports.help = {
   name: 'subscribe',
   description: 'Subscribes you to the subscription service to get notified of cool stuff, type the commmand again to unsubscribe.',
   usage: 'subscribe'
}