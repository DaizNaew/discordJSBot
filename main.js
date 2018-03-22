//NPM Node modules
const Discord = require("discord.js"),
      fs = require("fs"),
//Design the client
      client = new Discord.Client(),
//Local files
      m = require("chalk");
      config = require("../config.json"),
      log = require('./enum/consoleLogging');

require('./util/eventLoader')(client);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
require('./util/commandLoader')(client);

/*

//Sound commands
client.on('message', async message => {

    if(command === 'leave') {
        vChan.leave();console.log(`left channel ${vChan.name}`);
    }

    if(command === 'airhorn') {
        const horn = './sound/Jamaican Horn Siren.wav';
        const broadcast = client.createVoiceBroadcast();
        broadcast.playFile(horn);

        if(!vChan) return message.channel.send(errorJoinMSG);
        vChan.join()
        .then(connection => {
            const dispatcher = connection.playFile(horn);
        })
        .catch(console.error);
    }

    if(command === 'pause') {
        const broadcast = client.broadcasts;
        for(const connection of broadcast) {
            connection.pause();
        }
    }

    if(command === 'resume') {
        const broadcast = client.broadcasts;
        for(const connection of broadcast) {
            connection.resume();
        }
    }

});
*/

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(m.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(m.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(config.token);