const db_config = require("./db_config");


function selectAll() {
    return new Promise((resolve, reject) => {
        db_config.connection.query("select * from admin",function (err,rows){
            if(err){
                reject(err);
            }else {
                resolve(rows);
            }
        })
    });
}

function selectByUsernameAndPass(username,pass) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("select * from admin where username=? and password=?",[username,pass],function (err,rows){
            if(err){
                reject(err);
            }else {
                resolve(rows[0]);
            }
        })
    });
}


function selectByid(id) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("select * from admin where id =?",[id],function (err,rows){
            if(err){
                reject(err);
            }else {
                resolve(rows);
            }
        })
    });
}

function insert(username,password) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("insert into admin (username,password) values (?,?)",[username,password],function (err,rows){
            if(err){
                reject(err);
            }else {
                resolve(rows);
            }
        })
    });
}

function update(username,password,id) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("update admin set username=?,password=? where id=?",[username,password,id],function (err,rows){
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
        db_config.connection.query("delete from admin where id=?",[id],function (err,rows){
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
    "selectByUsernameAndPass":selectByUsernameAndPass,
    "selectByid":selectByid
}