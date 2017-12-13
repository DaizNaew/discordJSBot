const chalk = require('chalk');
const func = require('../enum/propFunctions');
const fs = require('fs');

function checkAllDeps(FilePos) {
    
        fs.open(FilePos, 'wx', (err, fd) => {
            if (err) {
                if (err.code === 'EEXIST') {
                    console.log(chalk.bgGreen.black(`${FilePos} already exists.`));
                    return;
                }
                throw err;
            }
            console.log(chalk.bgYellow.black(`${FilePos} does not exist, creating it.`));
            func.writeToFileSync(FilePos, " { } ");
            console.log(chalk.bgGreen.black(`Successfully created file at: ${FilePos}`));
            });
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

        setTimeout(function() {
            checkAllDeps("./storage/clientLog.json");
            checkAllDeps("./storage/playlist.json");
        }, 50);

        
        //channel.send('I am ready to rock and roll');

    
}