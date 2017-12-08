module.exports = member => {
    const varChannel = member.guild.channels.get('385782063887941632');
    //console.dir(member);
    varChannel.send(`Please welcome ${member.user.username} to the server!`);
    
}