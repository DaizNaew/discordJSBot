    //Local files
const   log = require("../enum/consoleLogging"),
        func = require('../func/propFunctions'),
    //NodeJS Modules
        _ = require("lodash");

module.exports = (multi, outof, luck) => {
    return winchance(multi, outof, luck);
}

/**
 * Function to calculate the chance for winning
 * @param {number} multiplier The multiplier used for calculating chance
 * @param {number} outof How big the chance is to actually win
 * @param {number} luck The character luck Modifier
 * @returns {boolean} Returns true if win
 */

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

module.exports.armwrestle = (strength, endurance) => {
    return strengthCalculated(strength, endurance);

}

/**
 * Function to calculate the chance for winning the armwrestling game, using the supplied stats
 * @param {number} strength The strength modifier
 * @param {number} endurance The endurance modifier
 * @returns {number} The calculated chance for winning
 */

strengthCalculated = (strength, endurance) => {

    modifier = (strength*0.80) + (endurance*0.65);
    random_fifty = _.random(0,50);
    calced_win = _.random((random_fifty+Math.round(modifier)), (random_fifty*modifier));

    return Math.round(calced_win);

}