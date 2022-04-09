const mysql = require("mysql");
var db_config={
    host     : 'localhost',
    port     :  3306,
    user     : 'root',
    password : '12345678',
    database : 'maxart',
};

var connection= mysql.createPool(db_config);

module.exports = {
    "connection" : connection
}
