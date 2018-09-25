        //Local Files
const   log = require('../enum/consoleLogging'),
        func = require('../func/propFunctions'),
        rpgFunc = require('../func/rpgFunctions'),
        //NodeJS Modules
        m = require('chalk');

exports.run = (client, message, params, command_success, command_fail) => {

    char_sheet = rpgFunc.getPlayerObject(message.member);
    red_cross = client.emojisByName.get("red_cross");

    stats_array = Object.keys(char_sheet['stats']);
    const longest = stats_array.reduce((long, str) => Math.max(long, str.length), 0);

    resp = `= Showing stats for ${message.member.displayName} = \n`;

    for(a in stats_array) {
        resp += `${parseInt(a)+1}). ${stats_array[a]}${' '.repeat(longest - stats_array[a].length)} :: Currently assigned : *${char_sheet.stats[stats_array[a]]}* points\n`
    }

    points_to_spend = 1;

    if(params[0] && !isNaN(params[0]) && params[0] <= char_sheet.statPoints && params[0] != 0) points_to_spend = params[0];

    if(char_sheet.statPoints !== 0) {
        resp += `\nYou have *${char_sheet.statPoints}* unspent stat points.\nClick the corresponding number below to add ${points_to_spend} to that stat.`
    } else {
        resp += `\nYou don't have any points to spend, level up to gain more points.`
    }

    message.channel.send(resp, {code: 'asciidoc' })
    .then(async msg => {
        
        if(char_sheet.statPoints !== 0) {
            for(i = 1; i < stats_array.length+1; i++) {
                await msg.react(i+"⃣")
            }
            await msg.react(red_cross);
            const reactionFilter = (reaction, user) => user.id === message.author.id;
            const collector = msg.createReactionCollector(reactionFilter);
            collector.on("collect", reaction => {
                cancel = false;
                if(reaction.emoji.name == red_cross.name) {
                    msg.clearReactions()
                    .then(() => {
                        msg.edit('You decided to not spend any skillpoints this time.');
                    })
                    .catch(err => log.error(err))
                    cancel = true;
                }
                if(cancel) return;
                i = reaction.emoji.name[0] -1;
                
                if(rpgFunc.spendSkillpoints(message.member, stats_array[i], points_to_spend)) {
                    msg.edit(`You just added *${points_to_spend}* point to ${stats_array[i]}, it is now at *${rpgFunc.getPlayerObject(message.member).stats[stats_array[i]]}*`)
                    msg.clearReactions()
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