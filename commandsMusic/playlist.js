exports.run = (client, message, params, command_success, command_fail) => {

    /* const queue = this.queue.get(message.guild.id);
    console.dir(queue); */



}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['Playlist', 'Queue', 'queue', 'songs', 'Songs'],
    permLevel: 0
}

exports.help = {
    name: 'playlist',
    description: 'Lists all the songs in the playlist',
    usage: 'playlist'
}