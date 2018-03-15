//NPM Node modules
const Discord = require("discord.js"),
      fs = require("fs"),
      ytdl = require("ytdl-core"),
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
        log.splitter(`Loading a total of ${files.length} commands.`);
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

/*

const connections = new Map();

var d, b;
    client.on('message', m => {
        if (!m.guild) return;
        
        if (m.author.id !== '128235918418116608') return;
        if (m.content.startsWith('/join')) {
          const channel = m.guild.channels.get(m.content.split(' ')[1]) || m.member.voiceChannel;
          if (channel && channel.type === 'voice') {
              console.log('Det er da vist en voice channel det der');
            channel.join().then(conn => {
              const receiver = conn.createReceiver();
              receiver.createStream(m.author, true).on('data', b => console.log(b.toString()));
              conn.player.on('error', (...e) => console.log('player', ...e));
              if (!connections.has(m.guild.id)) connections.set(m.guild.id, { conn, queue: [] });
              m.reply('ok!');
              
              // conn.playOpusStream(fs.createReadStream('C:/users/amish/downloads/z.ogg').pipe(new prism.OggOpusDemuxer()));
              
              d = conn.play(ytdl('https://www.youtube.com/watch?v=_XXOSf0s2nk', { filter: 'audioonly' }, { passes: 3 }));
              console.log(d);
            });
          } else {
            m.reply('Specify a voice channel!');
          }
        }
      });
*/
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
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(config.token);