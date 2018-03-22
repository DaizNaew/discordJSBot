const m = require('chalk'),
      log = require('../enum/consoleLogging'),
      _ = require('lodash');

exports.run = (client, message, params) => {
    message.channel.send('Fetching your search result...')
    .then(msg => {

        availSelections = ['top','viral','time']

    //console.log(params.length);
    //console.log(params);

    let selection;
    let keywords;
    let mes = '';
    
    if(params.length > 1) {
        selection = params[params.length-1];
        keywords = params.slice(0, params.length-1).join(',');
        mes = ''+selection + ' :: Dette er selection';
        if(!_.includes(availSelections,selection)) {
            keywords += ' '+selection;
            mes = 'No selection chosen ';
        }
        mes += '\n'+keywords + ' :: Dette er keywords';
    } else {
        selection = 'time';
        keywords = params[0];
        mes = keywords + ' :: Dette er keywords';
    }
    
    //console.log(selection);
    //console.log(keywords);

    const image = require('../func/imgurGetter')(message, keywords, selection);
    image.then(result => {
        //msg.edit(mes);
        msg.edit(result.link);
    })
    .catch(err => log.error(err));
    

    })
    .catch(err => log.error(err));
    
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['Imgur','imgsearch','image','img'],
    permLevel: 0
}

exports.help = {
    name: 'imgur',
    description: 'This allows you to search imgur for random images, containing the tag you want to search for',
    usage: 'imgur <args> <selection which can be one of these [hot,viral,time]>'
}