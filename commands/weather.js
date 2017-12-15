var weather = require('weather-js');

exports.run = (client, message, params) => {

    let input = params.slice(0).join(" ");
    

    message.channel.send('Fetchin the weather...')
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
    aliases: ['weather', 'forecast'],
    permLevel: 0
}

exports.help = {
    name: 'Weather',
    description: 'Weather to show how the weather is in your location of choice',
    usage: 'Weather <location>'
}

function findWeather(client, message, input, msg) {

    let localArr;
    let location;
    let current;

    weather.find({search: input, degreeType: 'C'}, function(err, result) {
        if(err) console.log(err);
        //console.log(JSON.stringify(result, null, 2));
        localArr = result[0];
        location = localArr.location;
        current = localArr.current;
        msg.edit(` ${location.name} it's currently ${current.skytext} at ${current.temperature} Celsius and it feels like ${current.feelslike} Celsius `);
      });
    
}