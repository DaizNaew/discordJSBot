        //Local files
const   log = require('../enum/consoleLogging'),
        embed = require('../model/embeds'),
        func = require('../func/propFunctions'),
        //NodeJS modules
        m = require('chalk'),
        {Util} = require('discord.js');
        
exports.run = (client, message, params, command_success, command_fail) => {
    message.channel.send('Fetching...', {code: 'asciidoc'})
    .then(msg => {
        msg.edit(showUserLog(message), {code: 'asciidoc'});
        message.react(command_success);
    })
    .catch(error => {
        message.channel.send('Something went wrong inside me. 😞 : \n '+ error);
        log.error(`Show command failed to execute [${error}]`);
        message.react(command_fail);
    });
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['whois'],
    permLevel: 0,
    category: func.getDirForCategory(__dirname)
}

exports.help = {
    name: 'show',
    description: 'Show command to show the full log about a user',
    usage: 'show <tag a user, like @them>  /Supply no user to check yo self '
}

function showUserLog(message){
    const   guildName = message.guild.name,
            mention =  message.mentions.members.first(),
            author = message.author;
        
    let userToShow;

    if(!mention) {
        id = author.id;
        userToShow = message.member;
    } else {
        id = mention.id;
        userToShow = mention;
    }

    try {
        clientLog = func.returnUserDate(userToShow);
    } catch(err) {
        clientLog = new Object;
        clientLog.userTag = userToShow.user.tag;
        clientLog.messages = 0;
    }
        
    let response,
        game_name = 'Nothing';
            
    if(userToShow.user.presence.game != null) game_name = userToShow.user.presence.game.name;

    log(`Showing data about: ${m.cyan.bold(userToShow.user.tag)}`);

    let created_date = new Date(userToShow.user.createdAt).toLocaleString('en-us', {  year: 'numeric',  day: 'numeric', month: 'long' });
    let joined_date = new Date(userToShow.joinedAt).toLocaleString('en-us', {  year: 'numeric',  day: 'numeric', month: 'long' });

    if(clientLog) {
        let avatar = userToShow.user.avatarURL;
        response = `I have a log on this person : ${clientLog.userTag}`;
        message.author.send(
            embed.RichEmbed(
                null,
                clientLog.userTag,
                ['Server Name', Util.escapeMarkdown(guildName),false,
                'isBot: ',userToShow.user.bot,true,
                'Amount of sent messages: ',clientLog.messages,true,
                'Highest role on server: ',userToShow.highestRole.name,true,
                'Currently playing: ', game_name,true, //delet this
                'User created at: ', created_date,true,
                'Joined this server at: ', joined_date ,true],
                userToShow.displayHexColor,
                null,
                null,
                null,
                avatar
            )
        ).catch(console.error);
    } else {
        response = `I cannot find this person in my records. 😞`;
    }
    return response;
}