const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const fs = require("fs");

let clientLog;

client.on("ready", () => {
    
    console.log("I am ready!" + ' And currently running in: '+client.guilds.size+' Servers');

    checkDirectory("./storage/", function(err) {
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
    } else
    
    if (command === 'log') {
        getAllLog(message);
    } else

    if(command === 'show') {
        let n = args[0];

        var result = message.mentions.users;
        
        console.log(result);

        message.reply(`${result}`);



        /* if(clientLog[client.users.get(id)]) {
            message.reply(`Jeg har en log på denne person : ${clientLog[client.users.get(n).id].usertag}`);
        } else {
            message.reply(`Nej, den person kender jeg ikke.`);
        } */
        
    }
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

function getAllLog(message){
    for(i in clientLog){
        console.log(clientLog[i]);
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
 
    fs.writeFile('storage/clientLog.json', JSON.stringify(clientLog, null, 4), (err) => {
        if (err) console.error(err);
    });

}


function writeToFile(file, text) {
    fs.writeFileSync(file, text);
}

function checkAllDeps(FilePos){
    setTimeout(function() {
        fs.open(FilePos, 'wx', (err, fd) => {
            if (err) {
                if (err.code === 'EEXIST') {
                    console.error(`${FilePos} already exists`);
                    return;
                }
                throw err;
            }
            writeToFile(FilePos, " { } ");
          });
    }, 500);
}

function checkDirectory(directory, callback) {  
    fs.stat(directory, function(err, stats) {
      //Check if error defined and the error code is "not exists"
      if (err && err.errno === -4058) {
        //Create the directory, call the callback.
        fs.mkdir(directory, callback);
      } else {
        //just in case there was a different error:
        callback(err)
      }
    });
  }

client.login(config.token);