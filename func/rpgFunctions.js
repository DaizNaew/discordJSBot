func = require('../func/propFunctions'),
log = require('../enum/consoleLogging'),
_ = require('lodash');

module.exports = {

    /**
     * @typedef {object} guildMember
     * @type {object}
     * @typedef {Array} player_object
     * @type {Array}
     * @typedef {object} characterSheet
     * @type {object}
     */

    /**
     * Function to construct a charactersheet for the chosen member using the chosen race.
     * @param {guildMember} member The member to construct a character sheet for, supplied as a guildmember object.
     * @param {string} race The race to use for the character, supplied as a raw string with the race name.
     */
    constructCharacterSheet:function(member, race){
        userData = func.returnUserDate(member);
        userData.RPGEnabled = true;
        userFolder = './storage/userStats/guilds/'+member.guild.id+'/users/'+member.id;
        func.writeToFileSync(userFolder+'/userData.json', func.beautifyJSON(userData));

        characterSheet = new Object();
        characterSheet = {
            race: race,
            level: 1,
            xp: 0,
            xp_to_next_level: 50,
            statPoints: 0,
            skillPoints: 0,
            nickname: member.user.username,
            userID: member.id
        }

        characterSheet.stats = {
            strength: 0,
            perception: 0,
            endurance: 0,
            charisma: 0,
            agility: 0,
            intelligence: 0,
            luck: 0
        }

        func.writeToFileSync(`./storage/RPG/users/${member.id}.json`, func.beautifyJSON(characterSheet));
    },

    /**
     * A function to add new xp to the character
     * @param {player_object} player_object An object containing the character of the player and the player as a guildmember
     * @param {guildMember} player_object[0] The member as a guildmember
     * @param {characterSheet} player_object[1] The charactersheet for this player object
     * @param {number} expToGain How much exp to add to the character sheet
     * @returns The gained exp
     */
    gainExp: function(player_object, expToGain, channel)  {
        if(!player_object[1].char_sheet) return 'no experience because they don\'t have a character yet';

        luck_modifier = player_object[1].char_sheet['stats'].luck;
        modNum = ((Math.random()*luck_modifier)*2,5)
        mod = _.random(modNum, _.random(modNum, modNum+2))

        expToGain += parseInt(mod);

        new_exp = player_object[1].char_sheet.xp + parseInt(expToGain);
    
        player_object[1].char_sheet.xp = new_exp;
    
        func.writeToFileSync(`./storage/RPG/users/${player_object[0].user.id}.json`,func.beautifyJSON(player_object[1].char_sheet));

        if(player_object[1].char_sheet.xp >= player_object[1].char_sheet.xp_to_next_level) {
            this.gainLvl(player_object, channel);
        }
        return expToGain + " experience";
    },

    /**
     * A function to level up the character and set a new xp requirement
     * @param {player_object} player_object An object containing the character of the player and the player as a guildmember
     * @param {guildMember} player_object[0] The member as a guildmember
     * @param {characterSheet} player_object[1] The charactersheet for this player object
     */
    gainLvl: function(player_object, channel) {

        player_object[1].char_sheet.level += 1;
        player_object[1].char_sheet.statPoints += 2;
        modded_xp = (player_object[1].char_sheet.xp % player_object[1].char_sheet.xp_to_next_level)
        player_object[1].char_sheet.xp_to_next_level = Math.floor(Math.pow((player_object[1].char_sheet.level/0.24),2));
        
        player_object[1].char_sheet.xp = modded_xp;

        func.writeToFileSync(`./storage/RPG/users/${player_object[0].user.id}.json`,func.beautifyJSON(player_object[1].char_sheet));

        channel.send(`**${player_object[0].nickname}** just leveled up and is now level: **${player_object[1].char_sheet.level}**`);

        return;
    },

    /**
     * Puts in stat points for the character belonging to the supplied player
     * @param {guildMember} member The player to work with, supplied as a guildmember
     * @param {string} stat The stat to affect
     */
    spendSkillpoints:function(member, stat, points_to_spend) {
        charsheet = this.getPlayerObject(member);
        points_to_add = 1;
        if(points_to_spend) points_to_add = parseInt(points_to_spend);
        stats = charsheet.stats;
        stat_to_raise = stat
        remaining_statpoints = charsheet.statPoints;
        if(remaining_statpoints === 0) return false;
        try {
            stats[stat_to_raise] += parseInt(points_to_add);
            remaining_statpoints -= points_to_add;
            charsheet.stats = stats;
            charsheet.statPoints = remaining_statpoints;
        } catch(error) {
            log.error(error);
        }
        func.writeToFileSync(`./storage/RPG/users/${member.user.id}.json`,func.beautifyJSON(charsheet));
        return true;
    },

    /**
     * Gets the character sheet for the supplied member
     * @param {guildMember} member The player to search for, supplied as a guildmember
     * @returns {characterSheet} The character sheet
     */
    getPlayerObject:function(member) {
        return func.readFromFileSync(`./storage/RPG/users/${member.id}.json`)
    }
}