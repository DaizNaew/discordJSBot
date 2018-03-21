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

    fs.readdir('./commands/', (err, files) => {
        if (err) log.error(err);
        log.splitter(`Loading a total of ${files.length} standard commands.`);
        files.forEach(f => {
            const props = require(`./commands/${f}`);
            log.cmd(`Loading Command: ${m.cyan.bold(props.help.name)}. `);
            client.commands.set(props.help.name, props);
            props.conf.aliases.forEach(alias => {
                client.aliases.set(alias, props.help.name);
            });
        });
        console.log();
    });

    fs.readdir('./commandsMusic/', (err, files) => {
        if (err) log.error(err);
        log.splitter(`Loading a total of ${files.length} music commands.`);
        files.forEach(f => {
            const props = require(`./commandsMusic/${f}`);
            log.mcmd(`Loading Command: ${m.cyan.bold(props.help.name)}. `);
            client.commands.set(props.help.name, props);
            props.conf.aliases.forEach(alias => {
                client.aliases.set(alias, props.help.name);
            });
        });
        console.log();
    });

    fs.readdir('./commandsGames/', (err, files) => {
        if (err) log.error(err);
        log.splitter(`Loading a total of ${files.length} game commands.`);
        files.forEach(f => {
            const props = require(`./commandsGames/${f}`);
            log.gcmd(`Loading Command: ${m.cyan.bold(props.help.name)}. `);
            client.commands.set(props.help.name, props);
            props.conf.aliases.forEach(alias => {
                client.aliases.set(alias, props.help.name);
            });
        });
        console.log();
    });
//Test

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
  console.log(m.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(m.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(config.token);