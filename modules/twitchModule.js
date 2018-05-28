        //Local Files
const m = require('../enum/consoleColour'),
      log = require('../enum/consoleLogging'),
      func = require('../func/propFunctions'),
      twitchGetter = require('../getters/twitchGetter'),
        //nodeJS plugins
      ax = require('axios'),
      moment = require('moment'),
      Discord = require('discord.js'),
      _ = require('lodash');

module.exports = (member) => {
    
    twitchFolk = func.readFromFileSync("./storage/twitchFolk.json");
    user_to_follow = '';
    users_array = [];
    i = 1;
    for(element in twitchFolk) {
        if(i != Object.keys(twitchFolk).length) {
            user_to_follow += element+'&id=';
        } else {
            user_to_follow += element;
        }
        users_array.push(element);
        i++;
    }

    let live_emoji = member.emojis.find("name", "live_emoji");

    return new Promise((resolve, reject) => {
    try {
    return resolve(twitchGetter.getUserData('id',user_to_follow)
        .then( result => {
            _.forEach(result, function(result){
                twitchGetter.getLiveStatus(result.id).then(response => {
                    if(response && twitchFolk[result.id].live == false) {
                        twitchGetter.getGameInfo(response.game_id).then(resolve => {
                            channelToWriteTo_array = [];

                            for(ele in twitchFolk) {
                                if(ele == result.id) {
                                    _.forEach(twitchFolk[ele].guilds, function(result){
                                        channelToWriteTo_array.push(member.channels.get(result['channel_ID']))
                                    })
                                }
                            }
                            
                            for(var channel in channelToWriteTo_array) {
                                
                                startDate = moment(response.started_at).format('YYYY-MM-DD HH:mm:ss');
                                now = moment().format('YYYY-MM-DD HH:mm:ss');
                                live_since = ((Date.now() - new Date(response.started_at)));
            
                                thumb = response.thumbnail_url.replace(/{width}/i, '1280');
                                thumb = thumb.replace(/{height}/i,'720');
            
                                embed = new Discord.RichEmbed();
                                embed.setAuthor(result.login, 'https://i.imgur.com/sug2x4Z.png')
                                .setDescription(response.title)
                                .setFooter('Powered by DiscordJS', 'https://i.imgur.com/wy9kt6e.png')
                                .setThumbnail(result.profile_image_url)
                                .setURL(`http://www.twitch.tv/${result.login}`)
                                .setColor(0x6441A4);
                                embed.setTitle(`${live_emoji}${result.display_name} currently live on Twitch`);
                                embed.addField('Currently Playing',resolve.name, true);
                                embed.addField('Current Viewercount',response.viewer_count,true);
                                embed.addField('Uptime',func.secondsToHms(live_since/1000),true);
                                embed.setImage(thumb);
                                embed.setTimestamp();
                                channelToWriteTo_array[channel].send(embed);
                            }

                            twitchFolk[result.id].live = !twitchFolk[result.id].live;
                            func.writeToFileSync("./storage/twitchFolk.json", func.beautifyJSON(twitchFolk));
                            
                        })
                    } else if (response == undefined && twitchFolk[result.id].live == true) {
                        for(ele in twitchFolk) {
                            if(ele == result.id) {
                                _.forEach(twitchFolk[ele].guilds, function(channel){
                                    (member.channels.get(channel['channel_ID'])).send(`${result.display_name} just went offline`);
                                })
                            }
                        }
                        twitchFolk[result.id].live = !twitchFolk[result.id].live;
                        func.writeToFileSync("./storage/twitchFolk.json", func.beautifyJSON(twitchFolk));
                    } else {
                        return;
                    }
                }).catch(error => {
                    log.error('[Twitch Module] '+error);
                    message.react(command_fail);
                })
            }) 
            
        })
        .catch(error => {
        log.error('[Twitch Module] '+error);
        }));
    } catch(error) {
        return reject((error));
    }
});
}