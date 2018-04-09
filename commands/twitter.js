const m = require('chalk'),
      log = require('../enum/consoleLogging'),
      func = require('../func/propFunctions');

exports.run = (client, message, params, command_success, command_fail) => {
    if(params.length !== 3) {
        message.react(command_fail);
        return message.channel.send('You are missing some parameters there buddy');
    }

    twitFolk = func.readFromFileSync("./storage/twitterFolk.json");
    console.dir(twitFolk);

    switch(params[0]) {
        case('follow'):
        if(!message.mentions.channels.first()) return message.channel.send('You need to mention a channel for me to post in.');
        followUser(params[1],message.mentions.channels.first(),client);
        length = Object.keys(twitFolk).length;
        if(!twitFolk[length]) {
            twitFolk[length] = {
                name : params[1],
				channel : message.mentions.channels.first().name,
				guild : message.mentions.channels.first().guild.name
            }
        }
        func.writeToFileSync("./storage/twitterFolk.json", func.beautifyJSON(twitFolk));
        break;
        case('unfollow'):
        if(!message.mentions.channels.first()) return message.channel.send('You need to mention a channel for me to post in.');
        return message.channel.send('I cannot unfollow yet.');
        break;
        default:
        message.react(command_fail);
        return message.channel.send('You need to write either follow or unfollow after the command and before the twitter user to follow');
    }
    message.react(command_success);
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['stalk'],
    permLevel: 0
}

exports.help = {
    name: 'twitter',
    description: 'An administrative command to control the twitter module',
    usage: 'twitter <follow/unfollow> <twitter handle> <channel as a mention>'
}

function followUser(twitterHandle, channelToWriteTo, client){

    require('../getters/twitterGetter').getUserID(twitterHandle)
    .then(response => {
        require('../getters/twitterGetter').createStream(client,response.id,channelToWriteTo)
        .then(response => {
            client.twitters.set(twitterHandle, response);
            log.tweet(`Started following ${twitterHandle} and posting the tweets in ${channelToWriteTo.name}`);
        })
        .catch(error => log.error(error));
    })
    .catch(error => log.error(error));
}