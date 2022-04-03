const db_config = require("./db_config");


function selectAll(id) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("select * from post_type where company_id=?",[id],function (err,rows){
            if(err){
                reject(err);
            }else {
                resolve(rows);
            }
        })
    });
}


function selectByid(company_id,id) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("select * from post_type where id =? and company_id=?",[id,company_id],function (err,rows){
            if(err){
                reject(err);
            }else {
                resolve(rows);
            }
        })
    });
}

function insert(name,company_id) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("insert into post_type (name,company_id) values (?,?)",[name,company_id],function (err,rows){
            if(err){
                reject(err);
            }else {
                resolve(rows);
            }
        })
    });
}

function update(name,company_id,id) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("update post_type set name=?,company_id=? where id=?",[name,company_id,id],function (err,rows){
            if(err){
                reject(err);
            }else {
                resolve(rows);
            }
        })
    });
}

function _delete(company_id,id) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("delete from post_type where id=? and company_id=?",[id,company_id],function (err,rows){
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