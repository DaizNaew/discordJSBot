//NPM Node modules
const Discord = require("discord.js");
const fs = require("fs");
const ytdl = require("ytdl-core");
const search = require("youtube-search");

var _ = require("lodash");
var _ = require("lodash/core");
var fp = require("lodash/fp");

var array = require('lodash/array');
var object = require('lodash/fp/object');

//Local files
const config = require("./config.json");
const func = require("./enum/propFunctions");

//Design the client
const client = new Discord.Client();
let clientLog;

client.on("ready", () => {
    
    console.log("I am ready!" + ' And currently running in: '+client.guilds.size+' Servers');

    func.checkDirectory("./storage/", function(err) {
        if(err) {
            console.log("Something went wrong: ",err);
        } else {
            console.log("No errors detected and I am good to go.");
        }
    });

    checkAllDeps("storage/clientLog.json");

    setTimeout(function() {
        clientLog = JSON.parse(fs.readFileSync("storage/clientLog.json", "utf8"));
    }, 750);

    var channel = client.channels.get('385782063887941632');
    var date = new Date(channel.createdTimestamp);
    console.log(`I am ${channel.client.user.tag} residing in ${channel.type} channel created at ${date}`);
    //channel.send('Bot deployed and ready for action.');

});

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

    if (command === 'clear') {
        if(!parseInt(args[0])) return;
        let messagecount = parseInt(args[0]) + 1;
        if(messagecount > 25 || messagecount === 0) return;
        await message.channel.fetchMessages({limit: messagecount})
        .then(messages => message.channel.bulkDelete(messages));
        let msgobj;

        setTimeout(function(){ msgobj = message.channel.send(`Done :) I have deleted ${messagecount-1} messages, `); }, 500);

        setTimeout(function(){ console.dir(_.compact(msgobj)); }, 1000);

        //setTimeout(function(){ message.channel.send(`this message will self destruct in 5 seconds`); }, 500);
        //setTimeout(function(){ message.channel.bulkDelete(2); }, 5000);
    }
    
    if (command === 'log') {
        getAllLog(message);
    }
    
    //Fix formatting for dm
    if(command === 'show') {
        let n = args[0];
        let mention = message.mentions.members.first();
        let author = message.author;
        if(n) {
            showEmbed(clientLog[mention.id].usertag, message);
            console.log(`Show command used by: ${author.id} to show data about: ${mention.id}`);
            if(clientLog[mention.id]) {
                message.reply(`Jeg har en log på denne person : ${clientLog[mention.id].usertag}`);
                message.author.send(`${clientLog[author.id].usertag} Blev oprættet: ${clientLog[author.id].usercreatedate} med disse stats:
                \nNavn på serveren: ${clientLog[author.id].firstNick} 
                Om bot eller ej: ${clientLog[author.id].clientisbot} 
                Har sendt: ${clientLog[author.id].messagesSent} beskeder
                Har kicket: ${clientLog[author.id].kickhammer} brugere, og bannet: ${clientLog[author.id].banhammer} brugere`)
                .then(message => console.log(`sent Message: ${message.content}`))
                .catch(console.error);
            } else {
                message.reply(`Nej, den person kender jeg ikke.`);
            }
        } else {
            console.log(`Show command used by: ${author.id} to show data about themself`);
            if(clientLog[author.id]) {
                message.reply(`Jeg kender dig godt : ${clientLog[author.id].usertag}`);
                message.author.send(`${clientLog[author.id].usertag} Blev oprættet: ${clientLog[author.id].usercreatedate} med disse stats:
                \nNavn på serveren: ${clientLog[author.id].firstNick} 
                Om bot elelr ej: ${clientLog[author.id].clientisbot} 
                Har sendt: ${clientLog[author.id].messagesSent} beskeder
                Har kicket: ${clientLog[author.id].kickhammer} brugere, og bannet: ${clientLog[author.id].banhammer} brugere`)
                .then(message => console.log(`sent Message: ${message.content}`))
                .catch(console.error);
            } else {
                message.reply(`Du er tydeligvis god til at gemme dig, jeg har intet på dig.`);
            }
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

    if(command === 'play') {
        let input = args.slice(0).join(" ");
        const streamOptions = { seek: 0, volume: 1 };
        const broadcast = client.createVoiceBroadcast();
        
        var opts = {
            maxResults: 1,
            key: config.ytKey,
            type: 'video'
        };

        if(input) {
            search(input, opts, function(err, results) {
                if(err) return console.log(err);
                let linkToPlay = results[0].link;
                console.dir(results);
                if(!vChan) return message.channel.send(errorJoinMSG);
                message.reply(`Now playing: ${results[0].title}`);
                vChan.join()
                .then(connection => {
                    const stream = ytdl(linkToPlay, { filter : 'audioonly'});
                    broadcast.playStream(stream);
                    const dispatcher = connection.playBroadcast(broadcast);
                    
                })
                .catch(console.error);
            });
        } else {
            return message.channel.send(`Du skal indtaste en sang eller give et link for at jeg virker.`);
        }
    }

    if(command === 'stop') {
        
        /* const broadcast = client.broadcasts;
        console.dir(broadcast);
        for(const connection of broadcast) {
            
            connection.end();
        } */
    }

    if(command === 'pause') {
        
        dispatcher.pause();
        
    }

    if(command === 'resume') {
        if(dispatcher.pause) dispatcher.pause();
        /* const broadcast = client.broadcasts;
        for(const connection of broadcast) {
            connection.resume();
        } */
    }

});

function getAllLog(message){
    for(const log of clientLog){
        console.log(log);
    }
    message.channel.send('There are '+i+' logged.');
}

function logging(message){

    if (!clientLog[message.author.id]) clientLog[message.author.id] = {
        
        messagesSent: 0, 
        usertag: message.author.id, 
        usercreatedate: message.author.createdAt, 
        clientisbot: message.author.bot, 
        firstNick: message.author.tag, 
        banhammer: 0, 
        kickhammer: 0
    }

    if(clientLog[message.author.id].usertag != message.author.tag) {
        clientLog[message.author.id].usertag = message.author.tag;
    }
 
    if(clientLog[message.author.id].usercreatedate != message.author.createdAt) {
        clientLog[message.author.id].usercreatedate = message.author.createdAt;
    }
 
    if(clientLog[message.author.id].clientisbot != message.author.bot) {
        clientLog[message.author.id].clientisbot = message.author.bot;
    }
 
    clientLog[message.author.id].messagesSent++;

    func.writeToFileAsync('storage/clientLog.json', func.beautifyJSON(clientLog));

}

function checkAllDeps(FilePos) {
    setTimeout(function() {
        fs.open(FilePos, 'wx', (err, fd) => {
            if (err) {
                if (err.code === 'EEXIST') {
                    console.error(`${FilePos} already exists`);
                    return;
                }
                throw err;
            }
            func.writeToFileSync(FilePos, " { } ");
            });
    }, 500);
}

client.login(config.token);