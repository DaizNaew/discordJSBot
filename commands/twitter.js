const m = require('chalk'),
      log = require('../enum/consoleLogging'),
      func = require('../func/propFunctions'),
      cEmbed = require('../model/embeds');

exports.run = (client, message, params, command_success, command_fail) => {

    if(!message.member.permissions.has("ADMINISTRATOR", true)) { message.react('🔒'); return message.channel.send('You do not have the required permissions to do this.'); }

    if(params.length !== 3) {
        message.react(command_fail);
        return message.channel.send('You are missing some parameters there buddy');
    }
    twitFolk = func.readFromFileSync("./storage/twitterFolk.json");
    switch(params[0]) {
        case('follow'):
        if(!message.mentions.channels.first()) return message.channel.send('You need to mention a channel for me to post in.');
        followUser(params[1],message.mentions.channels.first(),client)
        .then(resolve => {
            length = Object.keys(twitFolk).length;
            if(!twitFolk[length]) {
                twitFolk[length] = {
                    name : params[1],
                    channel : message.mentions.channels.first().name,
                    guild : message.mentions.channels.first().guild.name
                }
            }
            message.channel.send('`Now following`');
            message.channel.send(cEmbed.RichEmbed(
                [resolve.screen_name, "https://abs.twimg.com/icons/apple-touch-icon-192x192.png"],
                `${resolve.name} on Twitter`,
                ['Tweets', `${resolve.statuses_count}`, true, 'followers', `${resolve.followers_count}`, true],
                `0x${resolve.profile_link_color}`, //Official Twitter: 0x1da1f2
                null,
                `http://www.twitter.com/${resolve.screen_name}`,
                null,
                `${resolve.profile_image_url_https}`,
                `${resolve.description}`
            ));
            func.writeToFileSync("./storage/twitterFolk.json", func.beautifyJSON(twitFolk));
        })
        .catch(error => log.error(error));
        
        break;
        case('unfollow'):
        return message.channel.send('I cannot unfollow yet.');
        break;
        case('showall'):
        return console.dir(client.twitters);
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
    return new Promise((resolve, reject) => {
        require('../getters/twitterGetter').getUserID(twitterHandle)
        .then(response => {
            require('../getters/twitterGetter').createStream(client,response.id,channelToWriteTo)
            .then(response => {
                client.twitters.set(twitterHandle, response);
                log.tweet(`Started following ${twitterHandle} and posting the tweets in ${channelToWriteTo.name}`);
            })
            .catch(error => log.error(error));
            return resolve(response);
        })
        .catch(error => log.error(error));
    })
    .catch(error => log.error(error));
}