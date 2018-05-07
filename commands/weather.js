        //local files
const   findWeather = require("../func/weatherFunc"),
        log = require('../enum/consoleLogging');

exports.run = (client, message, params, command_success, command_fail) => {

    let input = params.slice(0).join(" ");
    
    message.channel.send('Fetchin the weather...', {code: 'asciidoc'})
    .then( msg => {

        findWeather(client, message, input, msg);
        message.react(command_success);

    })
    .catch(error => {
        message.channel.send('Something went wrong inside me. 😞 : \n '+ error);
        log.error(`Weather command failed to execute [${error}]`);
        message.react(command_fail);
    });
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['forecast'],
    permLevel: 0
}

exports.help = {
    name: 'weather',
    description: 'Weather to show how the weather is in your location of choice',
    usage: 'weather <location>'
}