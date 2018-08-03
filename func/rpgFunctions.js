func = require('./propFunctions');
module.exports = {

    gainExp: function(player_object, expToGain)  {
        if(!player_object[1].char_sheet) return;
 
        new_exp = player_object[1].char_sheet.xp + parseInt(expToGain);
    
        player_object[1].char_sheet.xp = new_exp;
    
        func.writeToFileSync(`./storage/RPG/users/${player_object[0].user.id}.json`,func.beautifyJSON(player_object[1].char_sheet));
    }

}