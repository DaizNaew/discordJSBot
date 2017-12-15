const findWeather = require("../func/weatherFunc");

exports.run = (client, message, params) => {

    let input = params.slice(0).join(" ");
    
    message.channel.send('Fetchin the weather...', {code: 'asciidoc'})
    .then( msg => {

        findWeather(client, message, input, msg);

    })
    .catch(error => {
        message.channel.send('Something went wrong inside me. 😞 : \n '+ error);
    });
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['Weather', 'forecast'],
    permLevel: 0
}

exports.help = {
    name: 'weather',
    description: 'Weather to show how the weather is in your location of choice',
    usage: 'weather <location>'
}

/* function findWeather(client, message, input, msg) {

    let defaultLocal; ;

    let localArr;
    let location;
    let current;

    const embed = new Discord.RichEmbed();

    if(!input) {defaultLocal = "London, UK"; input = defaultLocal;}

    weather.find({search: input, degreeType: 'C'}, function(err, result) {
        if(err) console.log(err);
        //console.log(JSON.stringify(result, null, 2));
        localArr = result[0];
        location = localArr.location;
        current = localArr.current;
        
        if(defaultLocal) { embed.setTitle("Showing the weather for the default location");} 
        embed.setThumbnail(current.imageUrl);
        embed.addField("Location 🏙",location.name, false);
        embed.addField("Current Weather 🌤",current.skytext,true);
        embed.addField("Wind speed 💨",current.windspeed,true);
        embed.addField("Temperature 🌡",current.temperature + ' Degrees Celsius',true);
        embed.addField("Feels like 🌡",current.feelslike + ' Degrees Celsius',true);
        msg.edit({embed});
      });
    
} */