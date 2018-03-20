        //NodeJS modules
const   m = require('chalk'),
        //Local files
        log = require('../enum/consoleLogging'),
        embed = require('../model/embeds');

exports.run = (client, message) => {

    var role_removed = false;

    message.channel.send("Adding you to the notify list...")
    .then(msg => {

        const subscribeRole = message.member.guild.roles.find('name', 'Notify_List');

        if(subscribeRole) {
            //console.dir(subscribeRole.id);
            //console.dir(message.member.roles);

            message.member.roles.forEach(element => {

                if(element.id == subscribeRole.id) {
                    msg.edit(embed.Embed(null,null,null,null,null,`You have been removed from the notification role`))
                    role_removed = true;
                    log(`Unsubscribed ${m.cyan.bold(message.author.tag)} on ${m.cyan.bold(message.guild.name)} to ${m.cyan.bold(subscribeRole.name)}`);
                    return message.member.removeRole(subscribeRole);
                }
            });            
        
        message.member.addRole(subscribeRole)
        .then( function() {
            if (!role_removed)msg.edit(embed.Embed(null,null,null,null,null,`You have been added to the notification role`));
            
        })
        .catch(error => {
            log.error(`Subscribe command failed to execute [${error}]`);
        });
        log(`Subscribed ${m.cyan.bold(message.author.tag)} on ${m.cyan.bold(message.guild.name)} to ${m.cyan.bold(subscribeRole.name)}`);
        } else {
            message.member.guild.createRole({
                name: 'Notify_List',
                color: 'GREY',
            })
            .then(role => {
                log.warning(`Created new role with name ${role.name} and color ${role.color}`);
                msg.edit(embed.Embed(null,null,null,null,null,`Created a new role to suit your needs, adding you to it now`));
                setTimeout(function(){
                    message.member.addRole(role);
                    msg.edit(embed.Embed(null,null,null,null,null,`You have been added to the notification role`));
                },500);
                log(`Subscribed ${m.cyan.bold(message.author.tag)} on ${m.cyan.bold(message.guild.name)} to ${m.cyan.bold(subscribeRole.name)}`);
            })
            .catch(error => log.error(error));
        }
    })
    .catch(error => {
        message.channel.send('Something went wrong inside me. 😞 : \n '+ error);
        log.error(`Subscribe command failed to execute [${error}]`);
    });
    
}

exports.conf = {
   enabled: true,
   guildOnly: false,
   aliases: ['Subscribe','notify','Notify'],
   permLevel: 0
}

exports.help = {
   name: 'subscribe',
   description: 'Subscribes you to the subscription service to get notified of cool stuff, type the commmand again to unsubscribe.',
   usage: 'subscribe'
}
