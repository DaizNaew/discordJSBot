const chalk = require('chalk'),
      log = require('../enum/consoleLogging'),
      func = require('../func/propFunctions');


module.exports = (reaction, user, client) => {
    let tempMsgID = func.readFromFileSync('./storage/tempMsgID.json');
    let isclient;
    let userid;
    let cmd = client.commands.get("help")
    reaction.users.map(r => {isbot = r.bot; userid = r.id})


    if(reaction.me){
        if(isbot) return;
        /*

        if(reaction.emoji.name == "❓"){
            cmd.run(client, reaction.message)
            reaction.remove().catch(error);
            reaction.remove(userid).catch(error);
        }

        if(reaction.emoji.name == "1⃣"){
            cmd.run(client, reaction.message, ["Standard"])
            reaction.remove(userid).catch(error);
            reaction.message.reactions.map(q => {q.remove()})
            reaction.message.react("⬅");
        }


        if(reaction.emoji.name == "2⃣"){
            cmd.run(client, reaction.message, ["Admin"])
            reaction.remove(userid).catch(error);
            reaction.message.reactions.map(q => {q.remove()})
            reaction.message.react("⬅");
        }

        if(reaction.emoji.name == "3⃣"){
            cmd.run(client, reaction.message, ["Fun"])
            reaction.remove(userid).catch(error);
            reaction.message.reactions.map(q => {q.remove()})
            reaction.message.react("⬅");
        }

        if(reaction.emoji.name == "4⃣"){
            cmd.run(client, reaction.message, ["NSFW"])
            reaction.remove(userid).catch(error);
            reaction.message.reactions.map(q => {q.remove()})
            reaction.message.react("⬅");
        }

        if(reaction.emoji.name == "5⃣"){
            cmd.run(client, reaction.message, ["Voice"])
            reaction.remove(userid).catch(error);
            reaction.message.reactions.map(q => {q.remove()})
            reaction.message.react("⬅");
        }



        if(reaction.emoji.name == "⬅"){
            reaction.message.delete();
            cmd.run(client, reaction.message)
        }

        */
       // console.log(reaction.message.id)
    }
}