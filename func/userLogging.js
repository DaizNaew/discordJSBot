        //Local Files
const   func = require('../func/propFunctions');

module.exports = (message) => {
        
    if(!message.guild) return;
    member = message.member;

    try {
        userDat = func.returnUserDate(member);

        if(userDat.userTag != member.user.tag) {
            userDat.userTag = member.user.tag;
        }
       
        if(userDat.firstNick != member.nickname) {
           userDat.currentNick = member.nickname;
        }

        userDat.messages++;

        func.writeToFileSync('./storage'+'/userStats'+'/guilds/'+member.guild.id+'/users/'+member.user.id+"/"+'userData.json', func.beautifyJSON(userDat)); 
    } catch (error){
        func.addUserData(member).then(userData => {

            userData.messages++;

            func.writeToFileSync('./storage'+'/userStats'+'/guilds/'+member.guild.id+'/users/'+member.user.id+"/"+'userData.json', func.beautifyJSON(userData));
        }).catch(err => console.error(err));
    }
}