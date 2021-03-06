        //Local files
const   log = require('../enum/consoleLogging'),
        //NodeJS Modules
        Discord = require("discord.js"),
        weather = require('weather-js');

module.exports = (client, message, input, msg) => {

    let defaultLocal,
        localArr,
        location,
        current;
    
    const embed = new Discord.RichEmbed();
    
    if(!input) {defaultLocal = "London, UK"; input = defaultLocal;}
    
    weather.find({search: input, degreeType: 'C'}, function(err, result) {

        if(err) return log.error(err);
        if(!result) return(msg.edit('No results found.'));
        localArr = result[0];
        if(localArr == []) return msg.edit('nothing were found');
        if(localArr === undefined) return msg.edit('I have failed to find: ' + input + ' on this planet.', {code: 'asciidoc'});
        location = localArr.location;
        current = localArr.current;
            
        if(defaultLocal) { embed.setTitle("Showing the weather for the default location");} 
        embed.setThumbnail(current.imageUrl);
        embed.setColor(0xFFC334);
        embed.addField("Location 🏙",location.name, true);
        embed.addField("Timezone 🕒","UTC: "+location.timezone,true);
        embed.addField("Current Weather 🌤",current.skytext,true);
        embed.addField("Wind speed 💨",current.winddisplay,true);
        embed.addField("Temperature 🌡",current.temperature + ' Degrees Celsius',true);
        embed.addField("Feels like 🌡",current.feelslike + ' Degrees Celsius',true);
        embed.addField("Humidity 💧",current.humidity + ' %',false)
        embed.setFooter('Powered by DiscordJS | This forecast were last updated: ' + current.observationtime,'https://i.imgur.com/wy9kt6e.png');
        msg.edit({embed});
    });
}