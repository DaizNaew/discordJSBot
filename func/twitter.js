const   Twitter = require('twitter'),
        config = require("../../config.json"),
        Discord = require("discord.js"),
        log = require("../enum/consoleLogging");

module.exports = {
  
        initStream: function(DClient) {
            
            var client = new Twitter({
                consumer_key: config.consumer_key,
                consumer_secret: config.consumer_secret,
                access_token_key: config.access_token_key,
                access_token_secret: config.access_token_secret
            });
            
        /**
        * Stream statuses filtered by keyword
        * number of tweets per second depends on topic popularity
        **/
       let tempChan;
       defChan = require("../storage/defaultChannel.json");
       DClient.guilds.forEach(element => {
           element.channels.forEach(channel => {
               if(channel.id === defChan["Testing Grounds"].defaultChannel) {
                   tempChan = channel;
               }
           });
       });       
       
        client.stream('statuses/filter', {follow: '205717291,923770736,828062956864864256' },  function(stream) {
            stream.on('data', function(tweet) {

                let tempText = '';
                let tempArr = tweet.display_text_range;

                log(tweet.display_text_range);

                for(i = tempArr[0]; i <= tempArr[1]; i++){
                    tempText += tweet.text[i];
                }

                log(tempText);
                dir(tweet.entities.media[0].media_url_https);

                const embed = new Discord.RichEmbed();
                embed.setAuthor(tweet.user.screen_name, tweet.user.profile_image_url_https);
                embed.setTitle(tweet.user.screen_name + " on Twitter");
                embed.setURL('http://www.twitter.com/'+tweet.user.screen_name);
                embed.setDescription(tempText);
                embed.setColor(0x1dcaff);
                embed.setTimestamp();
                if(tweet.entities.media[0].media_url_https) embed.setImage(tweet.entities.media[0].media_url_https);
                embed.setThumbnail("https://abs.twimg.com/icons/apple-touch-icon-192x192.png");
                embed.setFooter('Powered by DiscordJS and Twitter NPM');
                
                tempChan.send({embed});
            });
        
            stream.on('error', function(error) {
            log(error);
            });
        });
        
    },
    getUserTweet:function(searchParam){
        var client = new Twitter({
            consumer_key: config.consumer_key,
            consumer_secret: config.consumer_secret,
            access_token_key: config.access_token_key,
            access_token_secret: config.access_token_secret
        });
        client.get('search/tweets', {q: searchParam}, function(error, tweets, response) {
            
         });
    }
}