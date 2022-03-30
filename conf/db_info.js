let mysql = require('mysql');
let db_info = {
    host: 'localhost',
    user: 'USERNAME',
    password: 'PASSWORD',
    database: 'gg_ch',
    multipleStatements: true,
    dateStrings: 'date',
    clearExpired: true,
    checkExpirationInterval: 3600000,
    expiration: 3600000
}

module.exports = {
    init: function () {
        return mysql.createConnection(db_info);
    },
    // var conn = db_config.init();
    connect: function (conn) {
        conn.connect(function (err) {
            if (err) console.error('mysql connection error : ' + err);
            else console.log('mysql is connected successfully!');
        });
    },
    db_info
}
