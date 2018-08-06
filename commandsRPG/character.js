        //Local Files
const   log = require('../enum/consoleLogging'),
        func = require('../func/propFunctions'),
        //NodeJS Modules
        m = require('chalk'),
        _ = require('lodash');

exports.run = (client, message, params, command_success, command_fail) => {

    race_sheet = func.returnRaceSheet();
    user_sheet = false;

    const mention =  message.mentions.members.first();
    let user = message.member;
    if(mention) user = mention;

    try {
        user_sheet = func.readFromFileSync(`./storage/RPG/users/${user.id}.json`);
    } catch(err) {
        message.channel.send('It does not seem to me that you have chosen a race yet for the RPG games, type <!rpg.character_create> to make one');
    }
    
    if(user_sheet) {
        message.channel.send(constrUserEmbed(user_sheet,character(race_sheet, user_sheet.race),message));
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
    name: 'rpg.character',
    description: 'Create your character',
    usage: 'rpg.character'
}

character = (race_sheet, race, msg) =>{
    return race_sheet[race];
}

constrUserEmbed = (user_sheet, race, message) => {
    embed$ = {embed: {
        title: `Character sheet for: ${user_sheet.nickname}`,
        description: `**Race : ** ${user_sheet.race}`,
        fields:[

            {
                name: '** **',
                value: `** LEVEL **`
            },
            {
                name: 'LEVEL',
                value: `${user_sheet.level}`,
                "inline": true
            },
            {
                name: 'XP',
                value: `${user_sheet.xp}`,
                "inline": true
            },
            {
                name: 'XP NEEDED FOR NEXT LEVEL',
                value: `${user_sheet.xp_to_next_level}`,
                "inline": true
            },

            {
                name: '** **',
                value: `** STATS **`
            },
            {
                name: 'STRENGTH',
                value: `${race['stats'].strength+user_sheet['stats'].strength}`,
                "inline": true
            },
            {
                name: 'PERCEPTION',
                value: `${race['stats'].perception+user_sheet['stats'].perception}`,
                "inline": true
            },
            {
                name: 'ENDURANCE',
                value: `${race['stats'].endurance+user_sheet['stats'].endurance}`,
                "inline": true
            },
            {
                name: 'CHARISMA',
                value: `${race['stats'].charisma+user_sheet['stats'].charisma}`,
                "inline": true
            },
            {
                name: 'INTELLIGENCE',
                value: `${race['stats'].intelligence+user_sheet['stats'].intelligence}`,
                "inline": true
            },
            {
                name: 'AGILITY',
                value: `${race['stats'].agility+user_sheet['stats'].agility}`,
                "inline": true
            },
            {
                name: 'LUCK',
                value: `${race['stats'].luck+user_sheet['stats'].luck}`,
                "inline": true
            },
            {
                name: '** **',
                value: `** LEVEL **`
            },
            {
                name: 'StatPoints',
                value: `**Unspent statpoints:** ${user_sheet.statPoints}`,
                "inline": true
            },
            {
                name: 'SkillPoints',
                value: `**Unspent skillpoints:** ${user_sheet.skillPoints}`,
                "inline": true
            }
        ],
        footer: {
            text:'Generated by '+message.author.username
        }
    }}
    return embed$;
}