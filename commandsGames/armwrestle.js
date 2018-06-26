    //Local Files
const   log = require('../enum/consoleLogging'),
        func = require('../func/propFunctions'),
        gameFunc = require('../func/gameFuncs'),
    //Node Modules
        _ = require('lodash');

exports.run = (client, message, params, command_success, command_fail) => {

message.channel.send('Starting an arm wrestling contest!\nIf no oppenent accepts the match within 30 seconds, the match is canceled')
.then(msg => {

    player1_obj = new Object;
    player2_obj = new Object;

    player1 = message.member;
    temp = setTimeout(()=> {
        if(message.mentions.members.first()) {
            player2 = message.mentions.members.first();
            msg.edit(`${player2} were challenged to armwrestle, type <accept> to join the fun!`);
            message.channel.awaitMessages(mess => mess.content.toLowerCase() == 'accept' && mess.member == player2,{max: 1, time: 30000, errors: ['time']})
            .then((collection) =>
            {
                message.react(command_success)

                msg.edit(collection.first().member + ' Accepted the challenge!!!')
                setTimeout(() => {
                    msg.edit({
                        embed:{
                            title: 'Arm Wrestling Contest',
                            fields:[
                                {
                                    name: 'Player 1: '+player1.user.username,
                                    value: 'STRENGTH: 1 \nDEXTERITY: 1'
                                },
                                {
                                    name: 'Player 2: '+player2.user.username,
                                    value: 'STRENGTH: 1 \nDEXTERITY: 1'
                                }
                            ]
                        }
                    })
                    player1_obj.score = gameFunc.armwrestle(1,1);
                    player2_obj.score = gameFunc.armwrestle(1,1);
                    setTimeout(() => {
                        winner = player1;
                        if(player1_obj.score < player2_obj.score) winner = player2

                        msg.edit({embed:{
                            title: 'Arm Wrestling Contest',
                            description: winner.user.username + ' is the STRENGTH MASTER!'
                        }})
                    },2500)
                },2500)
            })
            .catch((collected) =>{
                message.react(command_fail)
                msg.edit('The match were canceled as '+player2.user.username+' did not accept in time')
            })
        } else {
            msg.edit('Type <join match> to join this wrestle match!');
            message.channel.awaitMessages(mess => mess.content.toLowerCase() == 'join match' && mess.member != player1 ,{max: 1, time: 30000, errors: ['time']})
            .then((collection) =>
            {
                message.react(command_success)

                player2 = collection.first().member;
                msg.edit(collection.first().member + ' Accepted the challenge!!!')
                setTimeout(() => {
                    msg.edit({
                        embed:{
                            title: 'Arm Wrestling Contest',
                            fields:[
                                {
                                    name: 'Player 1: '+player1.user.username,
                                    value: 'STRENGTH: 1 \nDEXTERITY: 1'
                                },
                                {
                                    name: 'Player 2: '+player2.user.username,
                                    value: 'STRENGTH: 1 \nDEXTERITY: 1'
                                }
                            ]
                        }
                    })
                    player1_obj.score = gameFunc.armwrestle(1,1);
                    player2_obj.score = gameFunc.armwrestle(1,1);
                    setTimeout(() => {
                        winner = player1;
                        if(player1_obj.score < player2_obj.score) winner = player2

                        msg.edit({embed:{
                            title: 'Arm Wrestling Contest',
                            description: winner.user.username + ' is the STRENGTH MASTER!'
                        }})
                    },2500)
                },2500)
            })
            .catch((collected) =>{
                message.react(command_fail)
                msg.edit('The match were canceled as nobody joined the match in time')
            })
        }
    },5000)
})

}

insultsArray = (params) => {
    arr = [
        ``
    ]

    return arr;
}

exports.conf = {
enabled: true,
guildOnly: true,
aliases: ['wrestle','beat'],
permLevel: 0,
category: func.getDirForCategory(__dirname)
}

exports.help = {
name: 'armwrestle',
description: 'Challenges another player to an armwrestle contest, chance for winning is based on your stats',
usage: 'armwrestle <tag a challenger>'
}