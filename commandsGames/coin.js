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
        setTimeout(() => {
            player_obj = new Object;
            player_obj.char_sheet = rpgFunc.getPlayerObject(message.member)
            player_object = [message.member, player_obj];
            if(params != 0) {
                if(gameFunc(6))
                {
                    rpgFunc.gainExp(player_object, Math.floor(_.random(0,5)));
                    return msg.edit(resultsArray(params)[_.random(0,(resultsArray(params).length-1))]+"\n"+
                    `You did however in some odd turn of events, win this once...`);
                }
                return msg.edit(resultsArray(params)[_.random(0,(resultsArray(params).length-1))]+"\n"+
                `Which means you lost, if you didn't get that already.`);
            }
            msg.edit(resultsArray(['Nothing'])[_.random(0,(resultsArray(['Nothing']).length-2))]+"\n"+`Not like you would of won anyway, you need to say heads or tails for a chance to win`);
        },2000);
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
