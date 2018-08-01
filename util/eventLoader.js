const reqEvent = (event) => require(`../events/${event}`);

module.exports = (client, active) => {
    client.on('ready', () => reqEvent('ready')(client));
    client.on('message', (message) => reqEvent('message')(message, active));
    client.on('messageReactionAdd', (reaction, user) => reqEvent('reaction')(reaction, user, client));
    client.on('guildMemberAdd', reqEvent('guildMemberAdd'));
    //client.on('guildMemberRemove', reqEvent('guildMemberRemove'));
};