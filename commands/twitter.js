const m = require('chalk'),
      log = require('../enum/consoleLogging');

exports.run = (client, message, params, command_success, command_fail) => {
    if(params.length !== 3) {
        message.react(command_fail);
        return message.channel.send('You are missing some parameters there buddy');
    }

    console.dir(message.mentions.channels.first());

    switch(params[0]) {
        case('follow'):
        followUser(params[1],params[2]);
        message.channel.send('Following');
        break;
        case('unfollow'):
        message.channel.send('Unfollow');
        break;
        default:
        message.react(command_fail);
        return message.channel.send('You need to write either follow or unfollow after the command and before the user to follow');
    }

    message.channel.send('I am a work in progress');
    log(message.author);
    message.react(command_success);
}

exports.conf = {
    enabled: false,
    guildOnly: true,
    aliases: ['stalk'],
    permLevel: 3
}

exports.help = {
    name: 'twitter',
    description: 'An administrative command to control the twitter module',
    usage: 'twitter <follow/unfollow> <twitter handle> <channel as a mention>'
}

function followUser(twitterHandle, channelToWriteTo){

    //channelMention = channelToWriteTo;

    console.dir(channelToWriteTo.channel);
    
    channelID = channelToWriteTo.id;

    //channelToWriteTo.send('test also '+channelID)

}