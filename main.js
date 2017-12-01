const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const fs = require("fs");

let clientLog;

client.on("ready", () => {
    console.log("I am ready!" + ' And currently running in: '+client.guilds.size+' Servers');
    //
    checkAllDeps("storage/clientLog.json");
    clientLog = JSON.parse(fs.readFileSync("storage/clientLog.json", "utf8"));
});

client.on("message", async message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command === 'ping') {
        message.channel.send('Pong!');
        message.channel.send('This bot has a: '+client.ping+'ms delay to the server.');
    } else

    if(command === 'blah') {
        message.channel.send('Meh.');
    } else

    if (command === "asl") {
        let [age, sex, location] = args;
        message.reply(`Hello ${message.author.username}, I see you're a ${age} year old ${sex} from ${location}. Wanna date?`);
    } else

    if(command === "say"){
        let text = args.slice(0).join(" ");
        message.delete();
        message.channel.send(text);
    } else 
      
    if (command === 'clear') {
        let messagecount = parseInt(args[0]) + 1;
        await message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
        setTimeout(function(){ message.channel.send(`Done :) I have deleted ${messagecount} messages, `); }, 500);
        setTimeout(function(){ message.channel.send(`this message will self destruct in 5 seconds`); }, 500);
        setTimeout(function(){ message.channel.bulkDelete(2); }, 5000);
      } 
  
    //else

    /*
    if(command === 'purge') {
        const deleteCount = parseInt(args[0], 10);
        if(!deleteCount || deleteCount < 2 || deleteCount > 100) 
            return message.reply(`I believe you tried to show too much power`);

            const fetched = await message.channel.fetchMessages({count: deleteCount});
            message.channel.bulkDelete(fetched)
        .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
        message.channel.send("Amount of purged messages = " + deleteCount);
        
    }
    */
});


/*
  function calcMessages(userID, userTag) {
    var user = {
      ClientID: userID,
      ClientName: userTag
    };
    var parseObject = JSON.parse(user);
    fs.write(":)");
    
  }
*/

function checkAllDeps(FilePos){
    
    fs.open(FilePos, 'wx', (err, fd) => {
        if (err) {
            if (err.code === 'EEXIST') {
                console.error(`${FilePos} already exists`);
                return;
            }
            throw err;
        }
        fs.writeFile(FilePos, "{ } ");
      });
}

client.login(config.token);