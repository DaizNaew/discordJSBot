const   Discord = require('discord.js'),
        log = require('../enum/consoleLogging');

module.exports.RichEmbed = (author,title,fieldStrings,color,footer,url,image,thumbnail) => {

    //Define the embed to use.
    const embed = new Discord.RichEmbed();

    //Logically do the author tag
    if(author){
        let lengthar;
        if(lengthar = author.length % 2){
            log(`I am modulus ${lengthar}`);
            embed.setAuthor(author);
        } else {
            log(`I am modulus ${lengthar}`);
            embed.setAuthor(author[0],author[1]);
        }
    }

    //Logically do multiple fields
    if(fieldStrings) {
        let x = 0;
        for(i = 0; i < fieldStrings.length/3 ; i++ ){
            embed.addField(fieldStrings[x],fieldStrings[x+1],fieldStrings[x+2]);
            x+=3;
        } 
    }
        //Singles
        if(title) embed.setTitle(title);
        if(color) { embed.setColor(color); } else { embed.setColor('0xFFFFFF')}
        if(url) embed.setURL(url);
        if(image) embed.setImage(image);
        if(thumbnail) embed.setThumbnail(thumbnail);
        if(!footer) {
            embed.setFooter('Powered by DiscordJS', 'https://i.imgur.com/wy9kt6e.png');
        } else {
            embed.setFooter(footer[0], footer[1]);
        }

    return {embed};

}

module.exports.Embed = (author,title,fieldStrings,color,url,description) => {

    const embed = { };

    if(author){
        let tempAuth = {
            name:author[0],
            icon_url: author[1]
        }
        embed.author = tempAuth;
    } 
    if(title) embed.title = title;
    embed.color = color;
    if(!color) embed.color = 0xFFFFFF;
    if(url) embed.url = url;
    if(description) embed.description = description;
    if(fieldStrings) embed.fields = fieldStrings;

    return {embed};
}