        //Local files
const   log = require("../enum/consoleLogging"),
        func = require('../func/propFunctions'),
        //NodeJS Modules
        _ = require("lodash");

exports.run = (client, message, params, command_success, command_fail) => {

    var playerHand = 0,dealerHand = 0;
    var playerHandCards = [],dealerHandCards = [];

    message.channel.send("Dealing...")
    .then(msg => {
        for(i = 0; i < 2; i++) {
            temp = drawCard();
            playerHandCards.push(temp);
            playerHand += temp[0];
        }

        console.log(playerHandCards);

        msg.edit(`${drawCard()}`);
        message.react(command_success);
    })
    .catch(error => {
        message.channel.send(`I have failed with [${error}]`);
        log(`BlackJack command failed to execute [${error}]`);
        message.react(command_fail);
    });
}

exports.conf = {
    enabled: false,
    guildOnly: false,
    aliases: ['bj','deal'],
    permLevel: 0,
    category: func.getDirForCategory(__dirname)
}

exports.help = {
    name: 'blackjack',
    description: 'starts a game of blackjack with the bot',
    usage: 'blackjack'
}

function drawCard() {
    icons = ['♥️','♠️','♦️','♣️']
    suite = _.random(0,3);
    card = _.random(0,12);
    return [require('../enum/cards')['cardDeck'][suite][card] , icons[suite]];
}