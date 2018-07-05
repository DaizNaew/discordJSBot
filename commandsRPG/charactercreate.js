        //Local Files
const   log = require('../enum/consoleLogging'),
        func = require('../func/propFunctions'),
        //NodeJS Modules
        m = require('chalk'),
        _ = require('lodash');

exports.run = (client, message, params, command_success, command_fail) => {

    race_sheet = func.returnRaceSheet();
    red_cross = client.emojis.find("name", "red_cross");
    races_array = Object.keys(race_sheet);

        message.channel.send(constrRaces())
        .then(async msg => {
            for(i = 1; i < 6; i++) {
                await msg.react(i+"⃣")
            }
            const reactionFilter = (reaction, user) => user.id === message.author.id
            const collector = msg.createReactionCollector(reactionFilter);

            collector.next.then(test => {
                integer = test.emoji.name[0] - 1;
                msg.delete().then(() => {
                    message.channel.send(constrRaceEmbed(character(race_sheet,races_array[integer])))
                    .then(msg => {
                        msg.react('✅');
                        msg.react(red_cross);
                        msg.awaitReactions((reaction, user) => reaction.emoji.name == '✅' && user.id == message.author.id,{max: 1, time: 60000, errors: ['time']})
                        .then((collection) =>
                        {
                            collection.first().remove();
                            return msg.edit({embed:{description: 'You are now an '+character(race_sheet,races_array[integer]).nominator}})
                        })
                        .catch(collection => console.log(collection));
                        msg.awaitReactions((reaction, user) => reaction.emoji == red_cross && user.id == message.author.id,{max: 1, time: 60000, errors: ['time']})
                        .then((collection) =>
                        {
                            collection.first().remove();
                            return msg.edit({embed:{description: 'Oh, okay. :('}})
                        })
                        .catch(collection => console.log(collection));
                    })
                    .catch(console.log);
                })
                .catch(console.log);
            })
            .catch(console.log);
        })
        .catch(console.log);

        /*
        message.channel.send(constrRaceEmbed(chosenRace, params))
        .then(msg => {
            msg.react('✅');
            msg.react(red_cross);
            msg.awaitReactions((reaction, user) => reaction.emoji.name == '✅' && user.id == message.author.id,{max: 1, time: 60000, errors: ['time']})
            .then((collection) =>
            {
                collection.first().remove();
                return msg.edit({embed:{description: 'You are now an '+params[0]}})
            })
            .catch(collection => console.log(collection));
            msg.awaitReactions((reaction, user) => reaction.emoji == red_cross && user.id == message.author.id,{max: 1, time: 60000, errors: ['time']})
            .then((collection) =>
            {
                collection.first().remove();
                return msg.edit({embed:{description: 'Oh, okay. :('}})
            })
            .catch(collection => console.log(collection));
            
        })
        */
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0,
    category: func.getDirForCategory(__dirname)
}

exports.help = {
    name: 'rpg.character_create',
    description: 'Create your character',
    usage: 'rpg.character_create <race>'
}

character = (race_sheet, race, msg) =>{
    return race_sheet[race];
}

constrRaceEmbed = (chosenRace) => {
    embed$ = {embed: {
        title: `Race sheet for: ${chosenRace.nominator}`,
        description: `**Race Description **\n`+chosenRace['descriptors'].description,
        fields:[
            {
                name: '** **',
                value: `** STATS **`
            },
            {
                name: 'STRENGTH',
                value: `${chosenRace['stats'].strength}`,
                "inline": true
            },
            {
                name: 'PERCEPTION',
                value: `${chosenRace['stats'].perception}`,
                "inline": true
            },
            {
                name: 'ENDURANCE',
                value: `${chosenRace['stats'].endurance}`,
                "inline": true
            }
            ,
            {
                name: 'CHARISMA',
                value: `${chosenRace['stats'].charisma}`,
                "inline": true
            }
            ,
            {
                name: 'INTELLIGENCE',
                value: `${chosenRace['stats'].intelligence}`,
                "inline": true
            }
            ,
            {
                name: 'AGILITY',
                value: `${chosenRace['stats'].agility}`,
                "inline": true
            }
            ,
            {
                name: 'LUCK',
                value: `${chosenRace['stats'].luck}`,
                "inline": true
            }
        ],
        footer: {
            text:'If you want to pick this race, click the ✅ reaction icon else click '+red_cross
        }
    }}
    return embed$;
}

constrRaces = () => {
    embed = { };
    array = [ ];
    i = 1;

    embed.title = "Shows all the available races to pick from";
    embed.description = "Click the corresponding number below this message to pick a race";

    _.forEach(func.returnRaceSheet(), race => {
        array.push({name: i + ': ' +race.nominator, value: race['descriptors'].description});
        i++;
    })

    embed.fields = array;

    return {embed};
}