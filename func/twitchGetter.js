const 
        https = require('https'),
            m = require('../enum/consoleColour'),
                log = require('../enum/consoleLogging'),
                    embed = require('../model/embeds');
                        ax = require('axios');
                            prop = require('../func/propFunctions');

module.exports = (message, twitchChannel) => {

    if(!twitchChannel) twitchChannel = '16964788';

    

    let stream_data,
        user_data_promise,
        game_data_promise,
        user_data,
        game_data;

        ax({
            method:'get',
            baseURL: 'https://api.twitch.tv/helix/',
            url:'streams/?user_id='+twitchChannel,
            headers: {
                'Client-ID': "gs0pucua7kdiegai0ps9h3z1t1bz94"
            }
        })
        .then( response => {
            
            user_data_promise = getUserInfo('id',response.data.data[0].user_id);
            game_data_promise = getGameInfo(response.data.data[0].game_id);
            stream_data = response.data.data[0]
        })
        .then( function() {

            user_data_promise.then(result => {
                user_data = result;
            });

            game_data_promise.then(result => {
                game_data = result;
            })

            setTimeout(function(){
                //console.dir(user_data)
                //console.dir(game_data)
                //console.dir(stream_data)

                date = new Date(stream_data.started_at);
                let thumb = stream_data.thumbnail_url.replace(/{width}/i, '1280');
                thumb = thumb.replace(/{height}/i,'720');

                message_to_embed = embed.RichEmbed(
                    [user_data.display_name,'http://www.stickpng.com/assets/images/580b57fcd9996e24bc43c540.png'],
                    'Title: '+stream_data.title,
                    ['Currently Playing',game_data.name, true, 'Current Viewercount',stream_data.viewer_count,true, 'Live since',date,true],
                    0x6441a5,
                    null,
                    'http://twitch.tv/'+user_data.login,
                    thumb,
                    user_data.profile_image_url,
                    null
                );

                //message.edit(user_data.login + '\n' +game_data.name + '\n' + stream_data.type);

                if(message) {
                    message.edit(message_to_embed);
                } else {
                    message.send(message_to_embed);
                }
                
                log.twitch(`A stream has been detected: user ${user_data.display_name} currently playing ${game_data.name}`);

            },1000);

        })
        .catch(err => {
            log('First Command');
            log.error(err);
            message.edit(embed.Embed(null,null,null,0x6441a5,null,'❌ The requested user is currently offline ❌'));
        });

        function getGameInfo(game_id){
            return ax({
                method:'get',
                baseURL: 'https://api.twitch.tv/',
                url: 'helix/games?id='+game_id,
                headers: {
                    'Client-ID': "gs0pucua7kdiegai0ps9h3z1t1bz94"
                }
            })
            .then( response => {
                let result = response.data.data[0];
                //console.dir(result);
                return result;
            })
            .catch(err => {
                log('Second Command')
                log.error(err);
            });

        }

        function getUserInfo( search_value, user_id){

            return ax({
                method:'get',
                baseURL: 'https://api.twitch.tv/',
                url: 'helix/users?'+search_value+'='+user_id,
                headers: {
                    'Client-ID': "gs0pucua7kdiegai0ps9h3z1t1bz94"
                }
            })
            .then( response => {
                let result = response.data.data[0];
                //console.dir(result);
                return result;
            })
            .catch(err => {
                log('Third Command')
                log.error(err);
            });
            
        }

}