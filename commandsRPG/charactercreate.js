        //Local Files
const   log = require('../enum/consoleLogging'),
        func = require('../func/propFunctions'),
        //NodeJS Modules
        m = require('chalk');

exports.run = (client, message, params, command_success, command_fail) => {

    raceSheet = func.returnRaceSheet();

    if(params == 0) {
        return message.channel.send('You need to tell me what race you want to be');
    }

    if(raceSheet[params[0]]) {
        chosenRace = raceSheet[params[0]];
        message.channel.send({embed: {
            title: `Race sheet for: ${params[0]}`,
            description: `**Race Description **\n`+chosenRace['descriptors'].description,
            fields:[
                {
                    name: 'STATS',
                    value: `STRENGTH: **${chosenRace['stats'].strength}**             PERCEPTION: **${chosenRace['stats'].perception}**
ENDURANCE: **${chosenRace['stats'].endurance}**         CHARISMA: **${chosenRace['stats'].charisma}**
INTELLIGENCE: **${chosenRace['stats'].intelligence}**      AGILITY: **${chosenRace['stats'].agility}**
LUCK: **${chosenRace['stats'].luck}**`
                }
            ],
            footer: {
                text:'If you want to pick this race, click the 👌 reaction icon'
            }
        }})
        .then(msg => {
            msg.react('👌');
            msg.awaitReactions((reaction, user) => reaction.emoji.name == '👌' && user.id == message.author.id,{max: 1, time: 60000, errors: ['time']})
            .then((collection) =>
            {
                collection.first().remove();
                msg.edit({embed:{description: 'You are now an '+params[0]}})
            })
            .catch(collection => console.log(collection));
        })
    } else {
        message.channel.send('I cannot find the race: '+params[0]+' in my database, did you do a misspell? All races starts with a capital letter')
    }

}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0,
    category: func.getDirForCategory(__dirname)
}

exports.help = {
    name: 'character_create',
    description: 'Creates your character',
    usage: 'character_create'
}

character = (raceSheet, race, msg) =>{
    return raceSheet[race];
}