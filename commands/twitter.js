const m = require('chalk'),
      log = require('../enum/consoleLogging');

exports.run = (client, message, params, command_success, command_fail) => {
    if(params.length !== 3) {
        message.react(command_fail);
        return message.channel.send('You are missing some parameters there buddy');
    }

    switch(params[0]) {
        case('follow'):
        if(!message.mentions.channels.first()) return message.channel.send('You need to mention a channel for me to post in.');
        followUser(params[1],message.mentions.channels.first());
        message.channel.send('Following');
        break;
        case('unfollow'):
        if(!message.mentions.channels.first()) return message.channel.send('You need to mention a channel for me to post in.');
        message.channel.send('Unfollow');
        break;
        default:
        message.react(command_fail);
        return message.channel.send('You need to write either follow or unfollow after the command and before the twitter user to follow');
    }

    message.channel.send('I am a work in progress');
    log(message.author);
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

function followUser(twitterHandle, channelToWriteTo){

    channelToWriteTo.send('I wirked');

}