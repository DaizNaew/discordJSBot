        //Local Files
const   log = require('../enum/consoleLogging'),
        func = require('../func/propFunctions'),
        //NodeJS Modules
        m = require('chalk');

exports.run = (client, message, params, command_success, command_fail) => {


    /* const queue = this.queue.get(message.guild.id);
    console.dir(queue); */



}

exports.conf = {
    enabled: false,
    guildOnly: true,
    aliases: ['queue', 'songs'],
    permLevel: 0,
    category: func.getDirForCategory(__dirname)
}

exports.help = {
    name: 'playlist',
    description: 'Lists all the songs in the playlist',
    usage: 'playlist'
}