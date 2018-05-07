        //Local Files
const   log = require('../enum/consoleLogging'),
        //NodeJS Modules
        m = require('chalk');

exports.run = (client, message, params, command_success, command_fail) => {

    message.channel.send("MAKING SOME NOISE...")
    .then(msg => {

        let airhornemoji = client.emojis.find("name", "airhorn");
        const horn = './sound/Jamaican Horn Siren.wav';
        const vChan = message.member.voiceChannel;

        if(!vChan) return msg.edit(`You need to be in a voice channel for me to join you`);
        vChan.join()
        .then(connection => {
            msg.edit(`${airhornemoji} DOOOOOOOOOD ${airhornemoji}`)
            const broadcast = client.createVoiceBroadcast();
            broadcast.playFile(horn);
            const dispatcher = connection.playBroadcast(broadcast);
            dispatcher.on('end', () => {
                vChan.leave();
            });
        })
        .catch(console.error);   
    })
    .catch(error => {
        log.error(`The Play command failed with [${error}]`);
        message.channel.send('Something went wrong inside me. 😞 : \n '+ error);
    });
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
}

exports.help = {
    name: 'airhorn',
    description: 'Blasts up dat voice channel with some dank ass airhorn noise',
    usage: 'airhorn'
}