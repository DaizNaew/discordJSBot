const   _ = require("lodash"),
        fp = require("lodash/fp"),
        log = require("../enum/consoleLogging");

exports.run = (client, message, params) => {

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
                numbersJoined.pop();numbersJoined.pop();
                numbers = numbersJoined.join(" ");
        }

        if(!numbers) return msg.edit("Please enter a valid roll format");

        msg.edit(`${message.author} I just rolled: ` 
        + numbers
        + "." );
    })
    .catch(error => {
        message.channel.send('Something went wrong inside me. 😞 : \n '+ error);
        log(error);
    });
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['Roll', 'flip'],
    permLevel: 0
}

exports.help = {
    name: 'roll',
    description: 'Rolls a specified amount of dice with the given sides',
    usage: 'roll <amount>d<sides>'
}