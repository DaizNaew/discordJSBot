        //Local Files
const   log = require('../enum/consoleLogging'),
        func = require('../func/propFunctions'),
        rpgFunc = require('../func/rpgFunctions'),
        //NodeJS Modules
        m = require('chalk'),
        _ = require('lodash');

exports.run = (client, message, params, command_success, command_fail) => {

    race_sheet = func.returnRaceSheet();
    red_cross = client.emojisByName.get("red_cross");
    races_array = Object.keys(race_sheet);
    emoji_array = ['✅'];
    emoji_array.push(red_cross.name);

        message.channel.send(constrRaces())
        .then(async msg => {
            for(i = 1; i < 6; i++) {
                await msg.react(i+"⃣")
            }
            const reactionFilter = (reaction, user) => user.id === message.author.id
            const collector = msg.createReactionCollector(reactionFilter);

            collector.on("collect", test => {
                integer = test.emoji.name[0] - 1;
                msg.delete().then(() => {
                    
                    message.channel.send(constrRaceEmbed(character(race_sheet,races_array[integer])))
                    .then(async nMsg => {
                        await nMsg.react('✅');
                        await nMsg.react(red_cross);
                        await nMsg.createReactionCollector(reactionFilter).on("collect", coll => {
                            chosen_race = character(race_sheet,races_array[integer]).nominator
                            switch(coll.emoji.name) {
                                case emoji_array[0]:
                                usernick = message.member.nickname;
                                if(usernick == null) usernick = message.author.username;
                                    nMsg.reactions.map(r => r.remove());
                                    nMsg.edit({embed:{description: 'You are now an '+chosen_race}})
                                    rpgFunc.constructCharacterSheet(message.member, chosen_race);
                                break;
                                case emoji_array[1]: 
                                    nMsg.reactions.map(r => r.remove());
                                    nMsg.edit({embed:{description: 'Oh, okay. :('}})
                            }
                        })
                    })
                    .catch(console.log);
                })
                .catch(console.log);
            })
        })
        .catch(console.log);
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
    usage: 'rpg.character_create'
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
            text:'If you want to pick this race, click the ✅ reaction icon else click the '+red_cross.name
        },
        color: 0xc05ae2
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

    embed.color = 0xc05ae2;

    embed.fields = array;

    return {embed};
}