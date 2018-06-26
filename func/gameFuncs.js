    //Local files
const   log = require("../enum/consoleLogging"),
        func = require('../func/propFunctions'),
    //NodeJS Modules
        _ = require("lodash");

module.exports = (multi, outof, luck) => {
    return winchance(multi, outof, luck);
}

winchance = (multiplier, outof, luck) => {
    if(outof == 0 || !outof || outof == null || outof == undefined) outof = 1;
    chance = 100 - Math.round(((outof/multiplier) * 100));
    random_hundred = _.random(0,100);
    if(luck != 0 && luck > 0) {
        random_hundred = random_hundred + Math.round((random_hundred * (_.random(1,luck)/10)));
    } 
    win = false;
    if(chance <= random_hundred) win = true;
    return win;
}

module.exports.armwrestle = (strength, dexterity) => {
    return strengthCalculated(strength, dexterity);

}

strengthCalculated = (strength, dexterity) => {

    modifier = (strength*0.80) + (dexterity*0.65);
    random_fifty = _.random(0,50);
    calced_win = _.random((random_fifty+Math.round(modifier)), (random_fifty*modifier));

    return Math.round(calced_win);

}