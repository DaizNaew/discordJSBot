module.exports = member => {
    const channel = member.guild.channels.get('385782063887941632');
    //console.dir(member);
    channel.send(`Please say goodbye to ${member.user.username}!`);
    
}