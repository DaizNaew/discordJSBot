        //Local Files
const   log = require('../enum/consoleLogging'),
        cEmbed = require('../model/embeds'),
        func = require('../func/propFunctions'),
        //NodeJS Modules
        Discord = require('discord.js');

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
            if(!message.member.permissions.has("ADMINISTRATOR", true)) { message.react('🔒'); return message.channel.send('You do not have the required permissions to do this, ask an admin for help.'); }
            if(params.length < 3) {
                message.react(command_fail);
                return message.channel.send('You are missing some parameters there buddy');
            }
            if(!message.mentions.channels.first()) return message.channel.send('You need to mention a channel for me to post in.');
            twitchFolk = func.readFromFileSync("./storage/twitchFolk.json");
            chan_to_post_in = message.mentions.channels.first();
            
            twitchGetter.getUserData('login',params[1])
            .then( result => {
                if(!twitchFolk[result[0].id]) {
                    twitchFolk[result[0].id] = { 'live' : false, 'guilds': {} };
                }
                if(!twitchFolk[result[0].id].guilds[message.guild.id]){
                    twitchFolk[result[0].id].guilds[message.guild.id] = { 'channel_ID' : chan_to_post_in.id };
                    msg.edit(`= Started Following ${result[0].display_name} in ${chan_to_post_in.name} =`, { code: 'asciidoc' });
                    embed = new Discord.RichEmbed();
                    embed.setAuthor(result[0].login, 'https://i.imgur.com/sug2x4Z.png')
                    .setDescription(result[0].description)
                    .setFooter('Powered by DiscordJS', 'https://i.imgur.com/wy9kt6e.png')
                    .setThumbnail(result[0].profile_image_url)
                    .setURL(`http://www.twitch.tv/${result[0].login}`)
                    .setColor(0x6441A4);
                    embed.setTitle(`${result[0].display_name} on Twitch`);
                    if(result[0].view_count) embed.addField('View Count', `${result[0].view_count}`, true);
                    if(result[0].broadcaster_type) embed.addField('Broadcaster type', `${result[0].broadcaster_type}`, true);
                    if(result[0].type) embed.addField('Personal type', `${result[0].type}`, true);
                    if(result[0].offline_image_url) embed.setImage(result[0].offline_image_url);
                    embed.setTimestamp();
                    message.channel.send(embed);
                }
                else if(twitchFolk[result[0].id].guilds[message.guild.id].channel_ID !== chan_to_post_in.id) {
                    twitchFolk[result[0].id].guilds[message.guild.id] = { 'channel_ID' : chan_to_post_in.id };
                    msg.edit(`= Updated to follow ${result[0].display_name} in ${chan_to_post_in.name} =`, { code: 'asciidoc' });
                } else if(twitchFolk[result[0].id].guilds[message.guild.id].channel_ID == chan_to_post_in.id) {
                    msg.edit(`= Already Following ${result[0].display_name} in ${chan_to_post_in.name} =`, { code: 'asciidoc' });
                }
                message.react(command_success);
                func.writeToFileSync("./storage/twitchFolk.json", func.beautifyJSON(twitchFolk));
            })
            .catch(error => {
                log.error(error);
                msg.edit('No user found with the name of: '+params[1])
                message.react(command_fail);
            });
            break;
            case 'remove':
            if(!message.member.permissions.has("ADMINISTRATOR", true)) { message.react('🔒'); return message.channel.send('You do not have the required permissions to do this, ask an admin for help.'); }
            if(params.length < 2) {
                message.react(command_fail);
                return message.channel.send('You are missing some parameters there buddy');
            }
            twitchFolk = func.readFromFileSync("./storage/twitchFolk.json");
            twitchGetter.getUserData('login',params[1])
            .then( result => {
                if(!twitchFolk[result[0].id].guilds[message.guild.id]) {
                    message.react(command_fail);
                    return msg.edit(`I am not even following ${params[1]}`);
                } else {
                    if(twitchFolk[result[0].id].guilds[message.guild.id]){
                        delete twitchFolk[result[0].id].guilds[message.guild.id];
                    }
                }
                msg.edit(`= Successfully stopped following ${result[0].display_name} on this server =`, {code: 'asciidoc'})
                message.react(command_success);
                func.writeToFileSync("./storage/twitchFolk.json", func.beautifyJSON(twitchFolk));
            })
            .catch(error => {
                log.error(error);
                msg.edit('No user found with the name of: '+params[1])
                message.react(command_fail);
            })
                
            break;
            default:
            if(!params[0]) {
                return msg.edit('Please supply me with a twitch user to look for');
            } else {
                channelToGet = params[0]
            }
            twitchGetter.getUserData('login',channelToGet)
            .then( result => {
                twitchGetter.getLiveStatus(result[0].id).then(response => {
                    if(response) {
                        stream_data = response;
                        twitchGetter.getGameInfo(response.game_id).then(resolve => {
                            game_data = resolve;
                            live_since = ((Date.now() - new Date(stream_data.started_at)));
    
                            let thumb = stream_data.thumbnail_url.replace(/{width}/i, '1280');
                            thumb = thumb.replace(/{height}/i,'720');
    
                            embed = new Discord.RichEmbed();
                                embed.setAuthor(result[0].login, 'https://i.imgur.com/sug2x4Z.png')
                                .setDescription(stream_data.title)
                                .setFooter('Powered by DiscordJS', 'https://i.imgur.com/wy9kt6e.png')
                                .setThumbnail(result[0].profile_image_url)
                                .setURL(`http://www.twitch.tv/${result[0].login}`)
                                .setColor(0x6441A4);
                                embed.setTitle(`${live_emoji}${result[0].display_name} currently live on Twitch`);
                                embed.addField('Currently Playing',game_data.name, true);
                                embed.addField('Current Viewercount',stream_data.viewer_count,true);
                                embed.addField('Uptime',func.secondsToHms(live_since/1000),true);
                                embed.setImage(thumb);
                                embed.setTimestamp();
                            msg.edit(embed);
                            message.react(command_success);
                        })
                    } else {
                        embed = new Discord.RichEmbed();
                            embed.setAuthor(result[0].login, 'https://i.imgur.com/sug2x4Z.png')
                            .setDescription(result[0].description)
                            .setFooter('Powered by DiscordJS', 'https://i.imgur.com/wy9kt6e.png')
                            .setThumbnail(result[0].profile_image_url)
                            .setURL(`http://www.twitch.tv/${result[0].login}`)
                            .setColor(0x6441A4);
                            embed.setTitle(`${result[0].display_name} on Twitch`);
                            if(result[0].view_count) embed.addField('View Count', `${result[0].view_count}`, true);
                            if(result[0].broadcaster_type) embed.addField('Broadcaster type', `${result[0].broadcaster_type}`, true);
                            if(result[0].type) embed.addField('Personal type', `${result[0].type}`, true);
                            if(result[0].offline_image_url) embed.setImage(result[0].offline_image_url);
                            embed.setTimestamp();
                        msg.edit(embed);
                        message.react(command_success);
                    }
                }).catch(error => {
                    log.error(error);
                    message.react(command_fail);
                })
            })
            .catch(error => {
                log.error(error);
                msg.edit('No user found with the name of: '+params[0])
                message.react(command_fail);
            })
            break;
        }
    })
    .catch( error => {
        message.channel.send('Something went wrong inside me. 😞 : \n '+ error);
        log.error(`Twitch command failed to execute [${error}]`);
        message.react(command_fail);
    });
}

exports.conf = {
   enabled: require('../config.json')['twitch_module'].enable_twitch_module,
   guildOnly: true,
   aliases: ['stream'],
   permLevel: 0,
   category: func.getDirForCategory(__dirname)
}

exports.help = {
   name: 'twitch',
   description: 'Handles some simple twitch integrations, like add/remove twitchers from the who to look for list, also shows a single twitch person',
   usage: 'twitch <twitch name> to show a single twitch person\ntwitch <add/remove> <twitch name> <optional #channel as a tag if add a person>'
}