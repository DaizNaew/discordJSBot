const fs = require("fs");

module.exports = {
  
    arrayifyJSON: function(arrayToJSON) {
        return JSON.parse(arrayToJSON, null, 4);
    },
    beautifyJSON: function(jsonToString){
        return JSON.stringify(jsonToString, null, 4);
    },
    writeToFileAsync: function(file, input) {
        fs.writeFile(file, input, (err) => {
            if (err) console.error(err);
        });
    },
    writeToFileSync: function(file, input) {
        fs.writeFileSync(file, input);
    },
    
    checkDirectory: function(directory, callback){
        fs.stat(directory, function(err, stats) {
        //Check if error defined and the error code is "not exists"
            if (err && err.errno === -4058) {
                //Create the directory, call the callback.
                fs.mkdir(directory, callback);
            } else {
                //just in case there was a different error:
                callback(err)
            }
        });
    }

    

}