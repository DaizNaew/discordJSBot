const chalk = require('chalk');

module.exports = {

    successMsg:function(input){
        return(chalk.bgGreen.black(input));
    },

    warningMsg:function(input){
        return(chalk.bgYellow.black(input));
    },

    errorMsg: function(input) {
        return(chalk.bgRed.black(input));
    },
    
    splitter:function(input) {
        return(chalk.magenta(`--${input}--`));
    },

    cmdLoad:function(input) {
        return(chalk.blue(`## ${input} ##`));
    }
}