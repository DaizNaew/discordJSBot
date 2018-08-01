        //Local Files
const   log = require('../enum/consoleLogging'),
        func = require('../func/propFunctions'),
        //NodeJS Modules
        m = require('chalk'),
        search = require("youtube-search");

exports.run = async (client, message, params, command_success, command_fail, ops) => {

    message.channel.send("Fetching a list of songs...")
    .then(async msg => {

        const config = require('../config.json');

        var opts = {
            maxResults: 10,
            key: config.ytKey,
            type: 'video'
        };

        search(params.join(' '),opts, (err, res) => {

            if(err) log.error(err);

            if(err) return message.channel.send('Sorry, something went wrong inside of me.');

            let videos = res.slice(0,10);

            let resp = '';
            for (var i in videos) {
                resp += `**[${parseInt(i)+1}]:** \`${videos[i].title}\`\n`; 
            }
            resp += `\n**Choose a number between** \`1-${videos.length}\``
            msg.edit(resp);

            const filter = n => !isNaN(n.content) && n.content < videos.length+1 && n.content > 0;
            const collector = msg.channel.createMessageCollector(filter);

            collector.videos = videos;
            collector.once('collect', n => {
                let commandFile= (require('../commandsMusic/play.js'));
                commandFile.run(client,message,[videos[parseInt(n.content)-1].link],command_success, command_fail, ops)
            })
        })
    })
    .catch(error => {
        log.error(`The Play command failed with [${error}]`);
        message.channel.send('Something went wrong inside me. 😞 : \n '+ error);
        message.react(command_fail);
    });
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['search'],
    permLevel: 0,
    category: func.getDirForCategory(__dirname)
}

exports.help = {
    name: 'ytSearch',
    description: 'Searches for a song/video on youtube that matches the given parameters',
    usage: 'search <parameters>'
}