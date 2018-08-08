    //Local Files
const   log = require('../enum/consoleLogging'),
        func = require('../func/propFunctions'),
        rpgFunc = require('../func/rpgFunctions'),
        gameFunc = require('../func/gameFuncs'),
    //Node Modules
        _ = require('lodash');

exports.run = (client, message, params, command_success, command_fail) => {

    message.channel.send('Flipping this coin!')
    .then(msg => {

        races = func.returnRaceSheet();
        player_obj = new Object;
        try {
            player_obj.char_sheet = rpgFunc.getPlayerObject(message.member);
        } catch(error) {
            log.error(error);
        }
        stats = player_obj.char_sheet;
        player_object = [message.member, player_obj];
        total_strength = parseInt(stats['stats'].strength) + parseInt(races[stats.race]['stats'].strength);
        time_delay = 2000*Math.floor(total_strength/2);
        too_stronk = false;

        if(time_delay >= 10000) {
            msg.edit(`Due to your excessive strength the coin went into outer space, it will take a while for it to return.`);
            too_stronk = !too_stronk;
            setTimeout(() => {
                msg.edit(`You can just about see the coin on its way back down.`);
            },time_delay-4500);
            setTimeout(() => {
                msg.edit('HERE IT COMES!');
            },time_delay-2000)
        }

        setTimeout(() => {
            if(params != 0) {
                if(gameFunc(6))
                {
                    rpgFunc.gainExp(player_object, Math.floor(_.random(0,5)));
                    if(too_stronk) {
                        return msg.edit(resultsArray(params)[_.random(0,3)]+"\n"+
                        `You did however in some odd turn of events, win this once...`);
                    }
                    return msg.edit(resultsArray(params)[_.random(0,(resultsArray(params).length-1))]+"\n"+
                    `You did however in some odd turn of events, win this once...`);
                }
                if(too_stronk) {
                    return msg.edit(resultsArray(params)[_.random(0,3)]+"\n"+
                    `Which means you lost, if you didn't get that already.`);
                }
                return msg.edit(resultsArray(params)[_.random(0,(resultsArray(params).length-1))]+"\n"+
                `Which means you lost, if you didn't get that already.`);
            }
            msg.edit(resultsArray(['Nothing'])[_.random(0,(resultsArray(['Nothing']).length-2))]+"\n"+`Not like you would of won anyway, you need to say heads or tails for a chance to win`);
        },time_delay);
    })

}

resultsArray = (params) => {
    arr = [
        `The coin landed on the side, would you look at that.`,
        `You won nothing, this game is hella rigged, you'll never win mortal!`,
        `The coin went into a time rift and is now gone.`,
        `The coin just disintigrated after being flipped too hard.`,
        `The coin got stuck in a cobweb under the rafters, and a spider now owns the coin.`,
        `The coin refused to get flipped.`,
        `The coin landed on ${params} and you won, but sadly the bank is broke and cannot payout.`
    ]
    return arr;
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['flip','coinflip'],
    permLevel: 0,
    category: func.getDirForCategory(__dirname)
}

exports.help = {
    name: 'coin',
    description: 'Flips a coin to check your skills at being lucky',
    usage: 'coin <heads|tails>'
}
