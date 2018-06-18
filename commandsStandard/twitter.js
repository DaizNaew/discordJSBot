        //local Files
const   log = require('../enum/consoleLogging'),
        func = require('../func/propFunctions'),
        cEmbed = require('../model/embeds'),
        //NodeJS Modules
        m = require('chalk');

exports.run = (client, message, params, command_success, command_fail) => {

    if(!message.member.permissions.has("ADMINISTRATOR", true)) { message.react('🔒'); return message.channel.send('You do not have the required permissions to do this, ask an admin for help.'); }

    switch(params[0]) {
        case('follow'):
        if(params.length < 3) {
            message.react(command_fail);
            return message.channel.send('You are missing some parameters there buddy');
        }
        if(!message.mentions.channels.first()) return message.channel.send('You need to mention a channel for me to post in.');
        twitFolk = func.readFromFileSync("./storage/twitterFolk.json");
        
        twitter_handle = params[1];
        chan_to_post_in = message.mentions.channels.first();
        getUserIDPromise = require('../getters/twitterGetter').getUserID(twitter_handle);
        getUserIDPromise.then(resolve => {
            if(!twitFolk[resolve.id]) {
                twitFolk[resolve.id] = {};
            }
            if(!twitFolk[resolve.id][message.guild.id]){
                twitFolk[resolve.id][message.guild.id] = { 'channel_ID' : chan_to_post_in.id };
                message.channel.send(`= Started Following ${resolve.screen_name} in ${chan_to_post_in.name} =`, { code: 'asciidoc' });
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
            }
            else if(twitFolk[resolve.id][message.guild.id].channel_ID !== chan_to_post_in.id) {
                twitFolk[resolve.id][message.guild.id] = { 'channel_ID' : chan_to_post_in.id };
                message.channel.send(`= Updated to follow ${resolve.screen_name} in ${chan_to_post_in.name} =`, { code: 'asciidoc' });
            } else if(twitFolk[resolve.id][message.guild.id].channel_ID == chan_to_post_in.id) {
                message.channel.send(`= Already Following ${resolve.screen_name} in ${chan_to_post_in.name} =`, { code: 'asciidoc' });
            }
            message.react(command_success);
            func.writeToFileSync("./storage/twitterFolk.json", func.beautifyJSON(twitFolk));
        })
        .catch( error => {
            log.error(error);
            message.channel.send(`Unable to find a twitter user with the handle of ${twitter_handle}`)
        });
        break;

        //UNFOLLOW CASE
        case 'unfollow':
        if(params.length < 2) {
            message.react(command_fail);
            return message.channel.send('You are missing some parameters there buddy');
        }
        twitFolk = func.readFromFileSync("./storage/twitterFolk.json");
        
        twitter_handle = params[1];
        getUserIDPromise = require('../getters/twitterGetter').getUserID(twitter_handle);
        getUserIDPromise.then(resolve => {
            if(!twitFolk[resolve.id][message.guild.id]) {
                message.react(command_fail);
                return message.channel.send(`I am not even following ${twitter_handle}`);
            } else {
                if(twitFolk[resolve.id][message.guild.id]){
                    delete twitFolk[resolve.id][message.guild.id];
                }
            }
            message.channel.send(`= Successfully stopped following ${twitter_handle} on this server =`, {code: 'asciidoc'})
            message.react(command_success);
            func.writeToFileSync("./storage/twitterFolk.json", func.beautifyJSON(twitFolk));
        })
        .catch( error => {
            log.error(error);
            message.channel.send(`Unable to find a twitter user with the handle of ${twitter_handle}`)
        });
        break;

        //DEFAULT CASTE
        default:
        message.react(command_fail);
        message.channel.send(`It seems you failed the command in some way, did you remember to do follow/unfollow?`)
    }
}

exports.conf = {
    enabled: require('../config.json')['twitter_module'].enable_twitter_module,
    guildOnly: true,
    aliases: ['stalk'],
    permLevel: 0,
    category: func.getDirForCategory(__dirname)
}

exports.help = {
    name: 'twitter',
    description: 'An administrative command to control the twitter module',
    usage: 'twitter <follow/unfollow> <twitter handle> <channel as a mention>'
}