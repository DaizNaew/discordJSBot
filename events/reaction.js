const chalk = require('chalk'),
      log = require('../enum/consoleLogging'),
      func = require('../func/propFunctions');


module.exports = (reaction, user, client) => {

    let userid;
    let cmd = client.commands.get("help")
    reaction.users.map(r => {isbot = r.bot; userid = r.id})


    if(reaction.me){
        if(isbot) return;
        
        if(reaction.emoji.name == "❓"){
            cmd.default(client, reaction.message)
            reaction.remove().catch(error => log.error(error));
            reaction.remove(userid).catch(error => log.error(error));
        }

        if(reaction.emoji.name == "1⃣"){
            cmd.category(client, reaction.message, "Standard")
            reaction.remove(userid).catch(error => log.error(error));
            reaction.message.reactions.map(q => {q.remove()})
            reaction.message.react("⬅");
        }

        if(reaction.emoji.name == "2⃣"){
            cmd.category(client, reaction.message, "Music")
            reaction.remove(userid).catch(error => log.error(error));
            reaction.message.reactions.map(q => {q.remove()})
            reaction.message.react("⬅");
        }

        if(reaction.emoji.name == "3⃣"){
            cmd.category(client, reaction.message, "Games")
            reaction.remove(userid).catch(error => log.error(error));
            reaction.message.reactions.map(q => {q.remove()})
            reaction.message.react("⬅");
        }

        if(reaction.emoji.name == "4⃣"){
            cmd.category(client, reaction.message, "Admin")
            reaction.remove(userid).catch(error => log.error(error));
            reaction.message.reactions.map(q => {q.remove()})
            reaction.message.react("⬅");
        }
        /*
        if(reaction.emoji.name == "5⃣"){
            cmd.run(client, reaction.message, ["Music"])
            reaction.remove(userid).catch(error => log.error(error));
            reaction.message.reactions.map(q => {q.remove()})
            reaction.message.react("⬅");
        }
        */

        if(reaction.emoji.name == "⬅"){
            reaction.message.delete().catch(error => log.error(error));
            cmd.default(client, reaction.message)
        }
    }
}