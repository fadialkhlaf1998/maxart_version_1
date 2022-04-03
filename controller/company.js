const db_config = require("./db_config");
const app_key = require("./app_key");


function selectAll() {
    return new Promise((resolve, reject) => {
        db_config.connection.query("select * from company",function (err,rows){
            if(err){
                reject(err);
            }else {
                resolve(rows);
            }
        })
    });
}



function selectByid(id) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("select * from company where id =?",[id],function (err,rows){
            if(err){
                reject(err);
            }else {
                resolve(rows);
            }
        })
    });
}

function insert(name,is_active) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("insert into company (name,is_active) values (?,?)",[name,is_active],function (err,rows){
            if(err){
                reject(err);
            }else {
                app_key.insert(makeid(),rows.insertId);
                resolve(rows);
            }
        })
    });
}


function makeid() {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 50; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}


function update(name,is_active,id) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("update company set name=?,is_active=? where id=?",[name,is_active,id],function (err,rows){
            if(err){
                reject(err);
            }else {
                resolve(rows);
            }
        })
    });
}

function _delete(id) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("delete from company where id=?",[id],function (err,rows){
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
    "insert":insert,
    "update":update,
    "_delete":_delete,
    "selectByid":selectByid
}