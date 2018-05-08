const reqEvent = (event) => require(`../events/${event}`);
//const   RC = require('reaction-core'),
        //handler = new RC.Handler();

module.exports = client => {
    client.on('ready', () => reqEvent('ready')(client));
    client.on('message', reqEvent('message'));
    //client.on('messageReactionAdd', (messageReaction, user) => handler.handle(messageReaction, user));
    //client.on('guildMemberAdd', reqEvent('guildMemberAdd'));
    //client.on('guildMemberRemove', reqEvent('guildMemberRemove'));
};