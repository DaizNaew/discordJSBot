//Modules to format timestamps in logging
const   moment = require('moment');

module.exports = (string) => {
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${string}`);
}