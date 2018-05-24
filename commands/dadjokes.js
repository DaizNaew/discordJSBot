        //Local Files
const   log = require('../enum/consoleLogging');

exports.run = (client, message, params, command_success, command_fail) => {
    message.channel.send("Concocting a dad joke...")
    .then(msg => {
        require('../getters/dadjokegetter')()
        .then(response => {
            msg.edit(response['joke']);
        })
        message.react(command_success);
    })
    .catch(error => {
        message.channel.send('Something went wrong inside me. 😞 : \n '+ error);
        log.error(`Dadjoke command failed to execute [${error}]`);
        message.react(command_fail);
    })
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
 }
 
 exports.help = {
    name: 'dadjoke',
    description: 'Gives you a dad joke',
    usage: 'dadjoke'
 }