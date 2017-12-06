const chalk = require('chalk');
const func = require('../enum/propFunctions');
const fs = require('fs');


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

module.exports = client => {

    const channel = client.channels.get('385782063887941632');
    const date = new Date(channel.createdTimestamp);
    console.log(chalk.bgGreen.black('I am ready! And currently running in: '+client.guilds.size + ' Servers\n'
    + `I am ${channel.client.user.tag} residing in ${channel.type} channel created at ${date}`))

        func.checkDirectory("./storage/", function(err) {
            if(err) {
                console.log(chalk.bgRed.black("Something went wrong: ",err));
            } else {
                console.log(chalk.bgGreen.black("No errors detected and I am good to go."));
            }
        });

        checkAllDeps("./storage/clientLog.json");
    
        setTimeout(function() {
            clientLog = JSON.parse(fs.readFileSync("./storage/clientLog.json", "utf8"));
        }, 750);
    
}