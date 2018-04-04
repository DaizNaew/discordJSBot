//NPM Node modules
const Discord = require("discord.js"),
      fs = require("fs"),
      m = require("chalk"),
//Design the client
      client = new Discord.Client(),
//Local files
      twit = require('./getters/twitterGetter.js'),
      func = require('./func/propFunctions'),
      regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

func.constructConfig('./config.json')

setTimeout(function(){

      const config = require("./config.json");

      require('./util/eventLoader')(client);

      client.commands = new Discord.Collection();
      client.aliases = new Discord.Collection();

      require('./util/commandLoader')(client);

      client.on('warn', e => {
            console.log(m.bgYellow(e.replace(regToken, 'that was redacted')));
      });

      client.on('error', e => {
            console.log(m.bgRed(e.replace(regToken, 'that was redacted')));
      });

      client.login(config.token)
      .catch( error => {
            console.log('You need to setup the config file before proceeding to run this bot');
            process.exit();
      });

      /////////////
      //  ####   //
      // Modules //
      //  ####   //
      /////////////

      if(config['twitter_module'].enable_twitter_module)twit.initStream(client);

},25);