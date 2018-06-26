//Modules to format timestamps in logging
const   moment = require('moment'),
        m = require('./consoleColour');

module.exports = (string) => {
    log("📄  "+string);
}

module.exports.success = (string) => {
    return log("✔️  "+m.successMsg(string));
}

module.exports.warning = (string) => {
    return log("🔔  "+m.warningMsg(string));
}

module.exports.error = (string) => {
    return log("❌  "+m.errorMsg(string));
}

module.exports.splitter = (string) => {
    return log(m.splitter(string));
}

module.exports.cmd = (string) => {
    return log("👌  "+m.cmdLoad(string));
}

module.exports.mcmd = (string) => {
    return log("🎼  "+m.cmdLoad(string));
}

module.exports.gcmd = (string) => {
    return log("🎲  "+m.cmdLoad(string));
}

module.exports.acmd = (string) => {
    return log("🚨  "+m.cmdLoad(string));
}

module.exports.rpgcmd = (string) => {
    return log("⚔️  "+m.cmdLoad(string));
}

module.exports.twitch = (string) => {
    return log("🎮  "+m.custom(string));
}

module.exports.tweet = (string) => {
    return log("🐦  "+m.twitter(string));
}

function log(string) {
    return console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${string}`);
}