const fs = require('fs');

module.exports = member => {
    if(member.user.id === '190758810179207169') return;
    const defChan = JSON.parse(fs.readFileSync("./storage/defaultChannel.json", "utf8"));
    const chanID = defChan[member.guild.name].defaultChannel;
    const varChannel = member.guild.channels.get(chanID);
    varChannel.send(`Please say goodbye to ${member.user.username}!`);
    
}