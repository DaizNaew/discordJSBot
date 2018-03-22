exports.parseUser = (message, user) => {
    const member = message.guild.member(user) || null;
    if(user.id === message.author.id) {
        return message.channel.send(`Don't even try it buddy`);
    } else if(member) {
        if(member.highestRole.position >= message.member.highestRole.position) return message.channel.send(`You are trying to excert too much power my friend`);
    }
    return user;
};