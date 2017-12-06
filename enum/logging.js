const func = require('./propFunctions');
const fs = require('fs');

module.exports = (message) => {

    let clientLog = JSON.parse(fs.readFileSync("./storage/clientLog.json", "utf8"));

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
        
            func.writeToFileAsync('./storage/clientLog.json', func.beautifyJSON(clientLog));
        
        }

