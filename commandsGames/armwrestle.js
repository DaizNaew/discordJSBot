    //Local Files
const   log = require('../enum/consoleLogging'),
        func = require('../func/propFunctions'),
        gameFunc = require('../func/gameFuncs'),
        rpgFunc = require('../func/rpgFunctions'),
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
            if(player2 == player1) return msg.edit(`LOOK AT THIS GUY, THINKING HE CAN WRESTLE HIMSELF.`);
            msg.edit(`${player2} were challenged to armwrestle, type <accept> to join the fun!`);
            message.channel.awaitMessages(mess => mess.content.toLowerCase() == 'accept' && mess.member == player2,{max: 1, time: 30000, errors: ['time']})
            .then((collection) =>
            {
                player1_obj.char_sheet = false;
                player2_obj.char_sheet = false;
                player1_obj.strength = 1;
                player1_obj.endurance = 1;
                player2_obj.strength = 1;
                player2_obj.endurance = 1;
                races = func.returnRaceSheet();

                try {
                    player1_obj.char_sheet = func.readFromFileSync(`./storage/RPG/users/${player1.id}.json`)
                    player1_obj.strength = player1_obj.strength + player1_obj.char_sheet['stats'].strength + races[player1_obj.char_sheet.race]['stats'].strength
                    player1_obj.endurance = player1_obj.endurance + player1_obj.char_sheet['stats'].endurance + races[player1_obj.char_sheet.race]['stats'].endurance
                }catch(err) {
                }

                try {
                    player2_obj.char_sheet = func.readFromFileSync(`./storage/RPG/users/${player2.id}.json`)
                    player2_obj.strength = player2_obj.strength + player2_obj.char_sheet['stats'].strength + races[player2_obj.char_sheet.race]['stats'].strength
                    player2_obj.endurance = player2_obj.endurance + player2_obj.char_sheet['stats'].endurance + races[player2_obj.char_sheet.race]['stats'].endurance
                } catch(err) {
                }
                
                message.react(command_success)

                msg.edit(collection.first().member + ' Accepted the challenge!!!')
                setTimeout(() => {
                    msg.edit({
                        embed:{
                            title: 'Arm Wrestling Contest',
                            fields:[
                                {
                                    name: 'Player 1: '+player1.user.username,
                                    value: `STRENGTH: ${player1_obj.strength} \nENDURANCE: ${player1_obj.endurance}`
                                },
                                {
                                    name: 'Player 2: '+player2.user.username,
                                    value: `STRENGTH: ${player2_obj.strength} \nENDURANCE: ${player2_obj.endurance}`
                                }
                            ]
                        }
                    })
                    player1_obj.score = gameFunc.armwrestle(player1_obj.strength,player1_obj.endurance);
                    player2_obj.score = gameFunc.armwrestle(player2_obj.strength,player2_obj.endurance);
                    setTimeout(() => {

                        winner = [player1, player1_obj];
                        if(player1_obj.score < player2_obj.score) winner = [player2, player2_obj]

                        msg.edit({embed:{
                            title: 'Arm Wrestling Contest',
                            description: ':muscle: ' + winner[0].user.username + ' is the STRENGTH MASTER! :muscle: '
                        }});
                        rpgFunc.gainExp(winner, Math.floor(6,12), message.channel);
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

                if(player2 == player1) return msg.edit(`LOOK AT THIS GUY, THINKING HE CAN WRESTLE HIMSELF.`);

                player1_obj.char_sheet = false;
                player2_obj.char_sheet = false;
                player1_obj.strength = 1;
                player1_obj.endurance = 1;
                player2_obj.strength = 1;
                player2_obj.endurance = 1;
                races = func.returnRaceSheet();

                try {
                    player1_obj.char_sheet = func.readFromFileSync(`./storage/RPG/users/${player1.id}.json`)
                    player1_obj.strength = player1_obj.strength + player1_obj.char_sheet['stats'].strength + races[player1_obj.char_sheet.race]['stats'].strength
                    player1_obj.endurance = player1_obj.endurance + player1_obj.char_sheet['stats'].endurance + races[player1_obj.char_sheet.race]['stats'].endurance
                }catch(err) {
                }

                try {
                    player2_obj.char_sheet = func.readFromFileSync(`./storage/RPG/users/${player2.id}.json`)
                    player2_obj.strength = player2_obj.strength + player2_obj.char_sheet['stats'].strength + races[player2_obj.char_sheet.race]['stats'].strength
                    player2_obj.endurance = player2_obj.endurance + player2_obj.char_sheet['stats'].endurance + races[player2_obj.char_sheet.race]['stats'].endurance
                } catch(err) {
                }

                msg.edit(collection.first().member + ' Accepted the challenge!!!')
                setTimeout(() => {
                    msg.edit({
                        embed:{
                            title: 'Arm Wrestling Contest',
                            fields:[
                                {
                                    name: 'Player 1: '+player1.user.username,
                                    value: `STRENGTH: ${player1_obj.strength} \nENDURANCE: ${player1_obj.endurance}`
                                },
                                {
                                    name: 'Player 2: '+player2.user.username,
                                    value: `STRENGTH: ${player2_obj.strength} \nENDURANCE: ${player2_obj.endurance}`
                                }
                            ]
                        }
                    })
                    player1_obj.score = gameFunc.armwrestle(player1_obj.strength,player1_obj.endurance);
                    player2_obj.score = gameFunc.armwrestle(player2_obj.strength,player2_obj.endurance);
                    setTimeout(() => {
                        winner = [player1, player1_obj];
                        if(player1_obj.score < player2_obj.score) winner = [player2, player2_obj]

                       exp_to_gain = rpgFunc.gainExp(winner, Math.floor(6,12), message.channel);

                        msg.edit({embed:{
                            title: 'Arm Wrestling Contest',
                            description: `:muscle: ${winner[0].user.username} is the STRENGTH MASTER! and gained ${exp_to_gain} :muscle: `
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
.catch(err => log.error(err));
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