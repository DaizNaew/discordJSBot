const fs = require('fs'),
        func = require('../func/propFunctions');

module.exports = member => {
    /*
    const defChan = JSON.parse(fs.readFileSync("./storage/defaultChannel.json", "utf8"));
    const chanID = defChan[member.guild.name].defaultChannel;
    const varChannel = member.guild.channels.get(chanID);
    varChannel.send(`Please welcome ${member.user.username} to the server!`);
    */
    func.addUser(member);
}