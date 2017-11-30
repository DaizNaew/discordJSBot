const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.on("ready", () => {
    console.log("I am ready!");
});

client.on("message", async message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command === 'ping') {
        message.channel.send('Pong!');
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


client.login(config.token);