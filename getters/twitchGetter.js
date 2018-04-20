        //Local Files
const log = require('../enum/consoleLogging'),
        //nodeJS plugins
      ax = require('axios');

module.exports = {

    config:function(){
        return require('../config.json')
    },
    getUserData:function(search_value,twitchChannel){
        return ax({
            method:'get',
            baseURL: 'https://api.twitch.tv/',
            url: 'helix/users?'+search_value+'='+twitchChannel,
            headers: {
                'Client-ID': this.config().twitch_module.twitch_client_id,
                'Accept' : 'application/vnd.twitchtv.v5+json'
            }
        })
        .then( response => {
            return response.data.data;
        })
        .catch(err => {
            log.error( err);
        });
    },

    getLiveStatus:function(user_id) {
        return ax({
            method:'get',
            baseURL: 'https://api.twitch.tv/',
            url: 'helix/streams?user_id='+user_id,
            headers: {
                'Client-ID': this.config().twitch_module.twitch_client_id,
                'Accept' : 'application/vnd.twitchtv.v5+json'
            }
        })
        .then(response => {
            let result = response.data.data[0];
            return result;
        })
        .catch(err => {
            log.error( err);
        })
    },
    
    getGameInfo:function (game_id){
        return ax({
            method:'get',
            baseURL: 'https://api.twitch.tv/',
            url: 'helix/games?id='+game_id,
            headers: {
                'Client-ID': this.config().twitch_module.twitch_client_id,
                'Accept' : 'application/vnd.twitchtv.v5+json'
            }
        })
        .then( response => {
            let result = response.data.data[0];
            return result;
        })
        .catch(err => {
            log.error( err);
        });

    }
}
