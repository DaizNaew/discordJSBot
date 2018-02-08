const func = require('../func/propFunctions');
const m = require('../enum/consoleColour');
const fs = require('fs');
const moment = require('moment');

const log = message => { console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`); };

module.exports = client => {

    client.user.setGame('Plotting world domination');

    const channel = client.channels.get('385782063887941632');
    const date = new Date(channel.createdTimestamp);
    let guildList = client.guilds.map( (g) => `${g.name} Created at: ${g.createdAt} Owned by: ${g.owner.user.tag}` ).join(' \n');

    log(m.splitter('Init Bot'));
    log(m.successMsg('I am ready! And currently running in: '+client.guilds.size + ' Servers\n'
    + `I am ${client.user.tag} residing in servers: \n${guildList} \n`));

    log(m.splitter('Error Checking'));
        func.checkDirectory("./storage/", function(err) {
            if(err) {
                log(m.errorMsg("Something went wrong: ",err));
            } else {
                log(m.successMsg("No errors detected and I am good to go.\n"));
            }
        });

        setTimeout(function() {
            log(m.splitter('Populated Directories'));
            checkAllDeps("./storage/clientLog.json");
            checkAllDeps("./storage/playlist.json");
            checkAllDeps("./storage/defaultTwitch.json");
        }, 50);
}

function checkAllDeps(FilePos) {
    
    fs.open(FilePos, 'wx', (err, fd) => {
        if (err) {
            if (err.code === 'EEXIST') {
                log(m.successMsg(`${FilePos} already exists.`));
                return;
            }
            throw err;
        }
        log(m.warningMsg(`${FilePos} does not exist, creating it.`));
        func.writeToFileSync(FilePos, " { } ");
        log(m.successMsg(`Successfully created file at: ${FilePos}`));
        });
}