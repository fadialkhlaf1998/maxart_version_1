const db_config = require("./db_config");

function selectAll() {
    return new Promise((resolve, reject) => {
        db_config.connection.query("select * from languages",function (err,rows){
            if(err){
                reject(err);
            }else {
                resolve(rows);
            }
        })
    });
}

module.exports={
    "selectAll": selectAll,
}