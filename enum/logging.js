const   func = require('../func/propFunctions'),
        fs = require('fs');

module.exports = (message) => {

    if(!message.guild) return;

    let clientLog = JSON.parse(fs.readFileSync("./storage/clientLog.json", "utf8"));
    
    const guildName = message.guild.name;
    const msgAuthor = message.author;
    const authID = msgAuthor.id;

    if(!clientLog[guildName]) { clientLog[guildName] = { } }

    if(!clientLog[guildName][authID]) {
        clientLog[guildName][authID] = {
            messagesSent: 0, 
            usertag: msgAuthor.id, 
            usercreatedate: msgAuthor.createdAt, 
            clientisbot: msgAuthor.bot, 
            firstNick: msgAuthor.tag, 
            banhammer: 0, 
            kickhammer: 0
        }
    }
        
            if(clientLog[guildName][authID].usertag != message.author.tag) {
                clientLog[guildName][authID].usertag = message.author.tag;
            }
         
            if(clientLog[guildName][authID].usercreatedate != message.author.createdAt) {
                clientLog[guildName][authID].usercreatedate = message.author.createdAt;
            }
         
            if(clientLog[guildName][authID].clientisbot != message.author.bot) {
                clientLog[guildName][authID].clientisbot = message.author.bot;
            }
         
            clientLog[guildName][authID].messagesSent++;
        
            func.writeToFileAsync('./storage/clientLog.json', func.beautifyJSON(clientLog));
        
        }

