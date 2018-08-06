func = require('../func/propFunctions');

module.exports = {

        //Function to make a character sheet.
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
     */
    gainExp: function(player_object, expToGain)  {
        if(!player_object[1].char_sheet) return;
 
        new_exp = player_object[1].char_sheet.xp + parseInt(expToGain);
    
        player_object[1].char_sheet.xp = new_exp;
    
        func.writeToFileSync(`./storage/RPG/users/${player_object[0].user.id}.json`,func.beautifyJSON(player_object[1].char_sheet));

        this.gainLvl(player_object);
    },

    /**
     * A function to level up the character and set a new xp requirement
     * @param {player_object} player_object An object containing the character of the player and the player as a guildmember
     */
    gainLvl: function(player_object) {

        player_object[1].char_sheet.level = player_object.char_sheet.level++;
        player_object[1].char_sheet.xp = 0;
        player_object[1].char_sheet.statPoints = player_object[1].char_sheet.statPoints + 5;
        player_object[1].char_sheet.xp_to_next_level = Math.floor((player_object[1].char_sheet.level/0.24)^2);

        func.writeToFileSync(`./storage/RPG/users/${player_object[0].user.id}.json`,func.beautifyJSON(player_object[1].char_sheet));

        return;
    },

    /**
     * Puts in stat points for the character belonging to the supplied player
     * @param {guildmember} member The player to work with, supplied as a guildmember
     */
    spendSkillpoints:function(member, stat) {
        charsheet = this.getPlayerObject(member);
        stats = charsheet.stats;
        remaining_statpoints = charsheet.statPoints;

    },

    /**
     * Gets the character sheet for the supplied member
     * @param {guildmember} member The player to search for, supplied as a guildmember
     * @returns {characterData} The character sheet
     */
    getPlayerObject:function(member) {
        return func.returnUserDate(member);
    }

}