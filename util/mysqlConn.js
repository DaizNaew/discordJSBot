const   mysql = require('mysql'),
        config = require('../config.json');

var con = mysql.createConnection({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.db
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log('Connected successfully... awaiting query');
  });