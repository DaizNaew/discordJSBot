const func = require('../func/propFunctions');
const m = require('../enum/consoleColour');
const fs = require('fs');

function checkAllDeps(FilePos) {
    
        fs.open(FilePos, 'wx', (err, fd) => {
            if (err) {
                if (err.code === 'EEXIST') {
                    console.log(m.successMsg(`${FilePos} already exists.`));
                    return;
                }
                throw err;
            }
            console.log(m.warningMsg(`${FilePos} does not exist, creating it.`));
            func.writeToFileSync(FilePos, " { } ");
            console.log(m.successMsg(`Successfully created file at: ${FilePos}`));
            });
}

module.exports = client => {
    const channel = client.channels.get('385782063887941632');
    const date = new Date(channel.createdTimestamp);
    let guildList = client.guilds.map( (g) => g.name + ' Created at: ' + g.createdAt + ' Owned by: ' + g.owner.user.tag ).join(' \n');

    console.log(m.splitter('Init Bot'));
    console.log(m.successMsg('I am ready! And currently running in: '+client.guilds.size + ' Servers\n'
    + `I am ${client.user.tag} residing in servers: \n${guildList} \n`));

    console.log(m.splitter('Error Checking'));
        func.checkDirectory("./storage/", function(err) {
            if(err) {
                console.log(m.errorMsg("Something went wrong: ",err));
            } else {
                console.log(m.successMsg("No errors detected and I am good to go.\n"));
            }
        });

        setTimeout(function() {
            console.log(m.splitter('Populated Directories'));
            checkAllDeps("./storage/clientLog.json");
            checkAllDeps("./storage/playlist.json");
        }, 50);

        
        //channel.send('I am ready to rock and roll');

    
}