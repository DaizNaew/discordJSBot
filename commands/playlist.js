exports.run = (client, message) => {

    /* const queue = this.queue.get(message.guild.id);
    console.dir(queue); */



}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['playlist', 'Queue', 'queue', 'songs', 'Songs'],
    permLevel: 0
}

exports.help = {
    name: 'Playlist',
    description: 'Lists all the songs in the playlist',
    usage: 'Playlist'
}
