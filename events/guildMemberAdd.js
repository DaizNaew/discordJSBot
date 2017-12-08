const fs = require('fs');

module.exports = member => {
    const defChan = JSON.parse(fs.readFileSync("./storage/defaultChannel.json", "utf8"));
    const chanID = defChan[member.guild.name].defaultChannel;
    console.log(chanID);
    const varChannel = member.guild.channels.get(chanID);
    //console.dir(member);
    varChannel.send(`Please welcome ${member.user.username} to the server!`);
    
}