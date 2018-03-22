const fs = require('fs');

const playList = JSON.parse(fs.readFileSync("./storage/playlist.json", "utf8"));

