//NPM Node modules
const Discord = require("discord.js");
const fs = require("fs");

//Modules to style the console.log
const chalk = require('chalk');
const moment = require('moment');

//Design the client
const client = new Discord.Client();

//Local files
const config = require("./config.json");
require('./util/eventLoader')(client);

const log = message => {
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
    };

    client.commands = new Discord.Collection();
    client.aliases = new Discord.Collection();

    fs.readdir('./commands/', (err, files) => {
        if (err) console.error(err);
        log(`Loading a total of ${files.length} commands.`);
        files.forEach(f => {
            const props = require(`./commands/${f}`);
            log(`Loading Command: ${props.help.name}. 👌`);
            client.commands.set(props.help.name, props);
            props.conf.aliases.forEach(alias => {
                client.aliases.set(alias, props.help.name);
            });
        });
    });


/*

//Sound commands
client.on('message', async message => {

    const args = message.content.slice(config.mprefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const vChan = message.member.voiceChannel;
    const errorJoinMSG = `Jeg kan ikke joine dig min ven, du er ikke i nogen voice. :(`;
    

    if(command === 'join') {
        //console.log(vChan);
        if(!vChan) return message.channel.send(errorJoinMSG);
        vChan.join().then(connection => console.log(`connected to ${vChan.name}`)).catch(console.error);
    }

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

    if(command === 'stop') {
        
        const broadcast = client.broadcasts;
        for(const connection of broadcast) {
            connection.end();
        }
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
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});


client.login(config.token);