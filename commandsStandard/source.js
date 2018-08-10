        //Local files
const   log = require('../enum/consoleLogging'),
        cEmbed = require('../model/embeds'),
        func = require('../func/propFunctions');

exports.run = (client, message, params, command_success, command_fail) => {

    message.channel.send("Fetching Sources...")
    .then(msg => {
        require('../getters/githubGetter')(message,'users/DaizNaew/repos','sort=discordJSBot')
        .then(response => {
            msg.edit(
                cEmbed.RichEmbed(
                    [response.data[0].owner.login, `https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png`],
                    `${response.data[0].name} on GitHub`,
                    ['Language', `${response.data[0].language}`,true, `License type`, `${response.data[0].license.name}`, true],
                    0x333333,
                    null,
                    `${response.data[0].html_url}`,
                    null,
                    `${response.data[0].owner.avatar_url}`,
                    `${response.data[0].description}`
                )
            );
            message.react(command_success);
        });
    })
    .catch(error => {
        message.channel.send('Something went wrong inside me. 😞 : \n '+ error);
        log.error(`Source command failed to execute [${error}]`);
        message.react(command_fail);
    });
}

exports.conf = {
   enabled: true,
   guildOnly: false,
   aliases: ['github'],
   permLevel: 0,
   category: func.getDirForCategory(__dirname)
}

exports.help = {
   name: 'source',
   description: 'Gives a link to the source of this bot',
   usage: 'source'
}
