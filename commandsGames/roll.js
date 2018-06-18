        //Local files
const   log = require("../enum/consoleLogging"),
        func = require('../func/propFunctions'),
        //NodeJS Modules
        _ = require("lodash");

exports.run = (client, message, params, command_success, command_fail) => {

    message.channel.send("Rolling...")
    .then(msg => {

        let input = [] = params[0].split("d");
        let results = [];
        let numbers = "";
        let debug;
        let numbersJoined;

        for(i = 0; i < input[0]; i++ ) results[i] = _.random(1, input[1]);
    
        results.forEach(number => {
            if(results.length === 1){numbers = "**"+number+"**"; debug = 0;} 
            if(results.length > 1) {numbers += "**"+number + "** and "; debug = 1;}
        });
        if(debug === 1) {
            numbersJoined= numbers.split(" ");
                numbersJoined.pop();
                numbers = numbersJoined.join(" ");
        }

        if(!numbers) return msg.edit("Please enter a valid roll format");

        msg.edit(`${message.author} I just rolled: ` 
        + numbers
        + "." );
        message.react(command_success);
    })
    .catch(error => {
        message.channel.send('Please enter a valid roll command, like !roll 1d20');
        log(`Roll command failed to execute [${error}]`);
        message.react(command_fail);
    });
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['flip'],
    permLevel: 0,
    category: func.getDirForCategory(__dirname)
}

exports.help = {
    name: 'roll',
    description: 'Rolls a specified amount of dice with the given sides',
    usage: 'roll <amount>d<sides>'
}