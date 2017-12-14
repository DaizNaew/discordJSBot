//NPM Node modules
const Discord = require("discord.js");
const fs = require("fs");

var _ = require("lodash");
var _ = require("lodash/core");
var fp = require("lodash/fp");

const chalk = require('chalk');
const moment = require('moment');

//Design the client
const client = new Discord.Client();
let clientLog;

//Local files
const config = require("./config.json");
const func = require("./enum/propFunctions");
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
client.on("message", async message => {
    logging(message);
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command === 'ping') {
        message.channel.send('Pong!');
        message.channel.send('This bot has a: '+client.ping+'ms delay to the server.');
    }

    if (command === "asl") {
        let [age, sex, location] = args;
        message.reply(`Hello ${message.author.username}, I see you're a ${age} year old ${sex} from ${location}. Wanna date?`);
    }

    if(command === "say"){
        let text = args.slice(0).join(" ");
        message.delete();
        message.channel.send(text);
    }
    
    if (command === 'log') {
        getAllLog(message);
    }

});

//Sound commands
client.on('message', async message => {

    logging(message);
    if (!message.content.startsWith(config.mprefix) || message.author.bot) return;

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

function showEmbed(data, message) {
    const embed = new Discord.RichEmbed()
    .setThumbnail(` `) // Icon
    .setColor(0x00AE86) // Color
    .addField(`Message`, data, true) // Servercount
    .setFooter(` `) // Footer
    // Send Embed
    message.channel.send({
        embed
    });
}


function getAllLog(message){
    for(const log of clientLog){
        console.log(log);
    }
    message.channel.send('There are '+i+' logged.');
}
*/

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});


client.login(config.token);