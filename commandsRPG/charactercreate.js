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
                                    createUser(chosen_race, message.author.id, usernick);
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

createUser = (race, id, userName) => {
    xp_to_next_level$ = 50;
    userStats = new Object;
    userStats.race = race;
    userStats.level = 1;
    userStats.xp = 0;
    userStats.xp_to_next_level = xp_to_next_level$;
    userStats.stats = {
        strength : 0,
        perception : 0,
        endurance : 0,
        charisma : 0,
        agility : 0,
        intelligence : 0,
        luck : 0
    },
    userStats.nickname = userName;

    func.writeToFileSync(`./storage/RPG/users/${id}.json`,func.beautifyJSON(userStats));
}