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
        let messagecount = parseInt(args[0]) + 1;
        await message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
        setTimeout(function(){ message.channel.send(`Done :) I have deleted ${messagecount} messages, `); }, 500);
        setTimeout(function(){ message.channel.send(`this message will self destruct in 5 seconds`); }, 500);
        setTimeout(function(){ message.channel.bulkDelete(2); }, 5000);
    }
    
    if (command === 'log') {
        getAllLog(message);
    }

    

    

    if(command === 'show') {
        let n = args[0];
        let mention = message.mentions.members.first();
        let author = message.author;
        if(n) {
            console.log(`Show command used by: ${author.id} to show data about: ${mention.id}`);
            if(clientLog[mention.id]) {
                message.reply(`Jeg har en log på denne person : ${clientLog[mention.id].usertag}`);
            } else {
                message.reply(`Nej, den person kender jeg ikke.`);
            }
        } else {
            console.log(`Show command used by: ${author.id} to show data about themself`);
            if(clientLog[author.id]) {
                message.reply(`Jeg kender dig godt : ${clientLog[author.id].usertag}`);
            } else {
                message.reply(`Du er tydeligvis god til at gemme dig, jeg har intet på dig.`);
            }
        }
    }

});

//Sound commands
client.on('message', async message => {

    logging(message);
    if (!message.content.startsWith(config.mprefix) || message.author.bot) return;

    const args = message.content.slice(config.mprefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command === 'join') {
        let vChan = message.member.voiceChannel;
        //console.log(vChan);
        vChan.join().then(connection => console.log(`connected to ${vChan.name}`)).catch(console.error);
    }

    if(command === 'leave') {
        let vChan = message.member.voiceChannel;
        vChan.leave();console.log(`left channel ${vChan.name}`);
    }

    if(command === 'airhorn') {
        const horn = './sound/Jamaican Horn Siren.wav';
        const broadcast = client.createVoiceBroadcast();
        broadcast.playFile(horn);
        if(client.voiceConnections.values() === null) return;
        for(const connection of client.voiceConnections.values()) {
            connection.playBroadcast(broadcast);
        }
    }

    if(command === 'play') {
        let input = args.slice(0).join(" ");
        const streamOptions = { seek: 0, volume: 1 };
        const broadcast = client.createVoiceBroadcast();
        let vChan = message.member.voiceChannel;
        var opts = {
            maxResults: 1,
            key: config.ytKey
        };

        if(!input.startsWith('https://')){
            search(input, opts, function(err, results) {
                if(err) return console.log(err);
                console.dir(results);
                var stdata = JSON.stringify(results);
                var sdata = JSON.parse(stdata);
                console.log(sdata);
                console.log(sdata.name);
            });
        } else {
            vChan.join()
            .then(connection => {
                const stream = ytdl(input, { filter : 'audioonly'});
                broadcast.playStream(stream);
                const dispatcher = connection.playBroadcast(broadcast);
            })
            .catch(console.error);
        }
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