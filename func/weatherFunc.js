        //Local files
const   log = require('../enum/consoleLogging'),
        //NodeJS Modules
        Discord = require("discord.js"),
        weather = require('weather-js'),
        m = require('chalk');

module.exports = (client, message, input, msg) => {

    let defaultLocal,
        localArr,
        location,
        current;
    
    const embed = new Discord.RichEmbed();
    
    if(!input) {defaultLocal = "London, UK"; input = defaultLocal;}
    
    weather.find({search: input, degreeType: 'C'}, function(err, result) {
        let guildName = `a private message`;

        if(message.channel.name && message.guild) guildname = `${m.cyan.bold(message.channel.name)} on ${m.cyan.bold(message.guild.name)}`;

        if(err) console.log(err);
        localArr = result[0];
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
        embed.setFooter('Last updated: ' + current.observationtime);
        msg.edit({embed});
        //log(`Weather command used by ${m.cyan.bold(message.author.tag)} to show the weather in ${m.cyan.bold(location.name)} in ${m.cyan.bold(guildName)}`);
    });
}