const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

const fs = require("fs");
let points = JSON.parse(fs.readFileSync("./storage/points.json", "utf8"));
let clientLog = JSON.parse(fs.readFileSync("./storage/clientLog.json", "utf8"));

client.on("ready", () => {
    console.log("I am ready!" + ' And currently running in: '+client.guilds.size+' Servers');
  //
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
      
      if (command === 'purge') {
        await snooze(5000);
        let messagecount = parseInt(args[0], 10);
        message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
        
        message.channel.send(`${messagecount} messages deleted. :)`)
      }else

        if (!points[message.author.id]) points[message.author.id] = {
        points: 0,
        level: 0
        };
        let userData = points[message.author.id];
        userData.points++;

        let curLevel = Math.floor(0.1 * Math.sqrt(userData.points));
        if (curLevel > userData.level) {
            // Level up!
            userData.level = curLevel;
            message.reply(`You"ve leveled up to level **${curLevel}**! Ain"t that dandy?`);
        }

        if (command === 'points') {
            message.reply(`You are currently level ${userData.level}, with ${userData.points} points.`);
        }
        fs.writeFile("./points.json", JSON.stringify(points), (err) => {
            if (err) console.error(err)
        });
  
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
client.login(config.token);