//Modules to return coloured outputs for the console
const chalk = require('chalk');

module.exports = {

    successMsg:function(input){
        return(chalk.green(input));
    },

    warningMsg:function(input){
        return(chalk.yellow(input));
    },

    errorMsg: function(input) {
        return(chalk.red(input));
    },

    twitter:function(input) {
        return(chalk.cyan(`${input}`));
    },
    
    splitter:function(input) {
        return(chalk.magenta(`-- ${input} --`));
    },

    cmdLoad:function(input) {
        return(chalk.blue(`## ${input}`));
    },
    
    custom:function(input) {
        return(chalk.magenta(input));
    }
}