const db_config = require("./db_config");


function selectAll() {
    return new Promise((resolve, reject) => {
        db_config.connection.query("select s.*,c.name as company from app_key s inner join company c on c.id=s.company_id",function (err,rows){
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
        db_config.connection.query("select * from app_key where id =?",[id],function (err,rows){
            if(err){
                reject(err);
            }else {
                resolve(rows);
            }
        })
    });
}

function selectByPublicKey(public_key) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("select company_id from app_key where public_key =?",[public_key],function (err,rows){
            if(err){
                reject(err);
            }else {
                resolve(rows);
            }
        })
    });
}

function selectByCompanyId(company_id) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("select public_key from app_key where company_id =?",[company_id],function (err,rows){
            if(err){
                reject(err);
            }else {
                resolve(rows);
            }
        })
    });
}

function selectAllCompanyId(public_key) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("select company_id from app_key where public_key =?",[public_key],function (err,rows){
            if(err){
                reject(err);
            }else {
                resolve(rows);
            }
        })
    });
}

function insert(public_key,company_id) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("insert into app_key (public_key,company_id) values (?,?)",[public_key,company_id],function (err,rows){
            if(err){
                reject(err);
            }else {
                resolve(rows);
            }
        })
    });
}

function update(public_key,company_id,company_id,id) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("update app_key set public_key=?,company_id=? where id=?",[public_key,company_id,id],function (err,rows){
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
        db_config.connection.query("delete from app_key where id=?",[id],function (err,rows){
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
    "selectByPublicKey": selectByPublicKey,
    "insert":insert,
    "update":update,
    "_delete":_delete,
    "selectByid":selectByid,
    "selectByCompanyId":selectByCompanyId,
}