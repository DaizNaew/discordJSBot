
module.exports = {

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
    }

}