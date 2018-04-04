const m = require('chalk'),
      log = require('../enum/consoleLogging'),
      _ = require('lodash');

exports.run = (client, message, params, command_success, command_fail) => {
    message.channel.send('Fetching your search result...')
    .then(msg => {

        availSelections = ['top','viral','time']
        
        let selection;
        let keywords;
        
        if(params.length > 1) {
            selection = params[params.length-1];
            keywords = params.slice(0, params.length-1).join(',');
            if(!_.includes(availSelections,selection)) {
                keywords += ' '+selection;
            }
        } else {
            selection = 'time';
            keywords = params[0];
        }

        const image = require('../getters/imgurGetter')(message, keywords, selection);
        image.then(result => {
            if(!result) return msg.edit('No result found, please try another search query');
            let temp_img = result.images[0].link;
            if(!result.images) temp_img = result.link;
            message.react(command_success);
            msg.edit({embed:{
                title: result.title,
                description: result.description,
                image : {
                    url: temp_img
                },
                author: {
                    name: result.account_url,
                    url: result.link,
                    icon_url: "https://cdn6.aptoide.com/imgs/e/3/f/e3f736f6c7997e9597b0be97a16b1be3_icon.png?w=120"
                },
                footer: {
                    text: `Views: ${result.views}, upvotes: ${result.ups}, downvotes: ${result.downs}\ntags: ${result.tags.map(t => `${t.name}`).join(', ')}`
                }
            }});
        }).catch(err => { message.react(command_fail); log.error(err)});
    }).catch(err => { message.react(command_fail); log.error(err)});
    
}

exports.conf = {
    enabled: require('../config.json')['imgur_module'].enable_imgur_module,
    guildOnly: true,
    aliases: ['imgsearch','image','img'],
    permLevel: 0
}

exports.help = {
    name: 'imgur',
    description: 'This allows you to search imgur for random images, containing the tag you want to search for',
    usage: 'imgur <args> <selection which can be one of these [hot,viral,time]>'
}