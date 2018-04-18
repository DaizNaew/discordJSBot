        //Local files
const   log = require('../enum/consoleLogging'),
        cEmbed = require('../model/embeds'),
        Discord = require('discord.js'),
        moment = require('moment'),
        func = require('../func/propFunctions');

exports.run = (client, message, params, command_success, command_fail) => {

    message.channel.send('Fetching Twitch link..')
    .then( msg => {

        twitchGetter = require('../getters/twitchGetter');

        let channelToGet,
            live_emoji = client.emojis.find("name", "live_emoji"),
            stream_data,
            game_data;

        switch(params[0]) {
            case 'add':
            break;
            case 'remove':
            break;
            default:
            if(!params[0]) {
                return msg.edit('Please supply me with a twitch user to look for');
            } else {
                channelToGet = params[0]
            }
            twitchGetter.getUserData('login',channelToGet)
            .then( result => {
                twitchGetter.getLiveStatus(result.id).then(response => {
                    if(response) {
                        stream_data = response;
                        twitchGetter.getGameInfo(response.game_id).then(resolve => {
                            game_data = resolve;
    
                            let startDate = moment(stream_data.started_at).format('YYYY-MM-DD HH:mm:ss');
                            let now = moment().format('YYYY-MM-DD HH:mm:ss');
                            live_since = ((Date.now() - new Date(stream_data.started_at)));
    
                            let thumb = stream_data.thumbnail_url.replace(/{width}/i, '1280');
                            thumb = thumb.replace(/{height}/i,'720');
    
                            embed = new Discord.RichEmbed();
                                embed.setAuthor(result.login, 'https://i.imgur.com/sug2x4Z.png')
                                .setDescription(stream_data.title)
                                .setFooter('Powered by DiscordJS', 'https://i.imgur.com/wy9kt6e.png')
                                .setThumbnail(result.profile_image_url)
                                .setURL(`http://www.twitch.tv/${result.login}`)
                                .setColor(0x6441A4);
                                embed.setTitle(`${live_emoji}${result.display_name} currently live on Twitch`);
                                embed.addField('Currently Playing',game_data.name, true);
                                embed.addField('Current Viewercount',stream_data.viewer_count,true);
                                embed.addField('Uptime',func.secondsToHms(live_since/1000),true);
                                if(result.offline_image_url) embed.setImage(thumb);
                                embed.setTimestamp();
                            msg.edit(embed);
                        })
                    } else {
    
                        embed = new Discord.RichEmbed();
                            embed.setAuthor(result.login, 'https://i.imgur.com/sug2x4Z.png')
                            .setDescription(result.description)
                            .setFooter('Powered by DiscordJS', 'https://i.imgur.com/wy9kt6e.png')
                            .setThumbnail(result.profile_image_url)
                            .setURL(`http://www.twitch.tv/${result.login}`)
                            .setColor(0x6441A4);
                            embed.setTitle(`${result.display_name} on Twitch`);
                            if(result.view_count) embed.addField('View Count', `${result.view_count}`, true);
                            if(result.broadcaster_type) embed.addField('Broadcaster type', `${result.broadcaster_type}`, true);
                            if(result.type) embed.addField('Personal type', `${result.type}`, true);
                            if(result.offline_image_url) embed.setImage(result.offline_image_url);
                            embed.setTimestamp();
                        msg.edit(embed);
    
                    }
                }).catch(error => {
                    log.error(error);
                })
            })
            .catch(error => {
                log.error(error);
                msg.edit('No user found with the name of: '+params[0])
            })
            break;
        }
        
        
    })
    .catch( error => {
        message.channel.send('Something went wrong inside me. 😞 : \n '+ error);
        log.error(`Twitch command failed to execute [${error}]`);
    });

}

exports.conf = {
   enabled: require('../config.json')['twitch_module'].enable_twitch_module,
   guildOnly: true,
   aliases: ['stream'],
   permLevel: 0
}

exports.help = {
   name: 'twitch',
   description: 'It does something to twitch, inappropiate most likely',
   usage: 'twitch'
}
