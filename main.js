//NPM Node modules
const Discord = require("discord.js"),
      m = require("chalk"),
//Design the client
      client = new Discord.Client(),
//Local files
      func = require('./func/propFunctions'),
      log = require('./enum/consoleLogging'),
      regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

func.constructConfig('./config.json');

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
      .catch( () => {
            console.log('You need to setup the config file before proceeding to run this bot');
            process.exit();
      });

      /////////////
      //  ####   //
      // Modules //
      //  ####   //
      /////////////
      
      /*
      if(config['twitter_module'].enable_twitter_module){
            try {
            var twitter_module_interval = setInterval(function(){
                  require('./modules/twitterModule.js')(client)
                  .catch(error => {
                        log.error(error);
                  })
            },60000*5); 
            } catch(error) {
                  log.error(error);
            }
            
      }
      */

      let delayTime = 60000;
      
      if(config['twitch_module'].enable_twitch_module){
            try {
            var twitch_module_interval = setInterval(function(){
                  require('./modules/twitchModule.js')(client).
                  then(()=>{
                        delayTime = 60000;
                  })
                  .catch(error => {
                        log.error('[Twitch Module] '+error);
                        delayTime = 600000;
                  })
            },delayTime);
            } catch(error) {
                  log.error('[Twitch Module] '+error);
            }
      }

      //require('./util/mysqlConn');

},25);