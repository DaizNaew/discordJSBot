var _ = require("lodash");
var fp = require("lodash/fp");

exports.run = (client, message, params) => {

    let input = [] = params[0].split("d");
    let results = [];
    let numbers = "";
    let numbersJoined;

    for(i = 0; i < input[0]; i++ ) results[i] = _.random(1, input[1]);

    results.forEach(number => {
        if(results.length === 1) numbers = number;
        if(results.length > 1) numbers += number + " and ";
    });

    if(numbers.length > 1) {
        numbersJoined= numbers.split(" ");
            numbersJoined.pop();numbersJoined.pop();
            numbers = numbersJoined.join(" ");
    }
    message.reply(`I just rolled: ` 
    + numbers
    + "." );

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['roll', 'flip'],
    permLevel: 0
}

exports.help = {
    name: 'Roll a die',
    description: 'Rolls a specified amount of dice with the given sides',
    usage: 'Roll <amount>d<sides>'
}
