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
    }
}