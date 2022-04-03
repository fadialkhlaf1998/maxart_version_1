const db_config = require("./db_config");


function selectAll(id) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("select * from discount_code where company_id=?",[id],function (err,rows){
            if(err){
                reject(err);
            }else {
                resolve(rows); 
            }
        })
    });
}

function checkCode(code,id) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("select amount from discount_code where code = ? and company_id=?",[code,id],function (err,rows){
            if(err){
                reject(err);
            }else {
                if(rows.length>0){
                    resolve(rows[0]);
                }else{
                    var obj = new Object();
                    obj.amount=0;
                    resolve(obj);
                }
            }
        })
    });
}


function selectByid(company_id,id) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("select * from discount_code where id =? and company_id=?",[id,company_id],function (err,rows){
            if(err){
                reject(err);
            }else {
                resolve(rows);
            }
        })
    });
}

function insert(code,amount,company_id) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("insert into discount_code (code,amount,company_id) values (?,?,?)",[code,amount,company_id],function (err,rows){
            if(err){
                reject(err);
            }else {
                resolve(rows);
            }
        })
    });
}

function update(code,amount,id) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("update discount_code set code=?,amount=? where id=?",[code,amount,id],function (err,rows){
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
        db_config.connection.query("delete from discount_code where id=? and company_id=?",[id,company_id],function (err,rows){
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
    "selectByid":selectByid,
    "checkCode":checkCode,
}