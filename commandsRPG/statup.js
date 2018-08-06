        //Local Files
const   log = require('../enum/consoleLogging'),
        func = require('../func/propFunctions'),
        rpgFunc = require('../func/rpgFunctions'),
        //NodeJS Modules
        m = require('chalk');

exports.run = (client, message, params, command_success, command_fail) => {

    char_sheet = rpgFunc.getPlayerObject(message.member);

    stats_array = Object.keys(char_sheet['stats']);
    const longest = stats_array.reduce((long, str) => Math.max(long, str.length), 0);

    resp = `= Showing stats for ${message.member.displayName} = \n`;

    for(a in stats_array) {
        resp += `${parseInt(a)+1}). ${stats_array[a]}${' '.repeat(longest - stats_array[a].length)} :: Currently assigned : *${char_sheet.stats[stats_array[a]]}* points\n`
    }

    if(char_sheet.statPoints !== 0) {
        resp += `\nYou have *${char_sheet.statPoints}* unspent stat points.\nClick the corresponding number below to add 1 to that stat.`
    } else {
        resp += `\nYou don't have any points to spend, level up to gain more points.`
    }

    message.channel.send(resp, {code: 'asciidoc' })
    .then(async msg => {
        if(char_sheet.statPoints !== 0) {
            for(i = 1; i < stats_array.length+1; i++) {
                await msg.react(i+"⃣")
            }
            const reactionFilter = (reaction, user) => user.id === message.author.id;
            const collector = msg.createReactionCollector(reactionFilter);
            collector.on("collect", reaction => {
                i = reaction.emoji.name[0] -1;
                
                if(rpgFunc.spendSkillpoints(message.member, stats_array[i])) {
                    msg.edit(`You just added *1* point to ${stats_array[i]}, it is now at *${rpgFunc.getPlayerObject(message.member).stats[stats_array[i]]}*`)
                    msg.clearReactions(m)
                    .catch(err => log.error(err))
                }
            })
        }
    })
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0,
    category: func.getDirForCategory(__dirname)
}

exports.help = {
    name: 'rpg.statup',
    description: 'Allows you to distribute your unspent statpoints',
    usage: 'rpg.statup'
}