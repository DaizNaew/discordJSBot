module.exports = member => {
    const channel = member.guild.channels.get('385782063887941632');
    //console.dir(member);
    channel.send(`Please welcome ${member.user.username} to the server!`);
    
}