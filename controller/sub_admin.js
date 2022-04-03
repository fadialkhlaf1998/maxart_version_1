const db_config = require("./db_config");


function selectAll() {
    return new Promise((resolve, reject) => {
        db_config.connection.query("select s.*,c.name as company from sub_admin s inner join company c on c.id=s.company_id",function (err,rows){
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
        db_config.connection.query("select s.* from sub_admin s inner join company c on s.company_id=c.id where username=? and password=? and c.is_active=1",[username,pass],function (err,rows){
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
        db_config.connection.query("select * from sub_admin where id =?",[id],function (err,rows){
            if(err){
                reject(err);
            }else {
                resolve(rows);
            }
        })
    });
}

function insert(username,password,company_id) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("insert into sub_admin (username,password,company_id) values (?,?,?)",[username,password,company_id],function (err,rows){
            if(err){
                reject(err);
            }else {
                resolve(rows);
            }
        })
    });
}

function update(username,password,company_id,id) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("update sub_admin set username=?,password=?,company_id=? where id=?",[username,password,company_id,id],function (err,rows){
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
        db_config.connection.query("delete from sub_admin where id=?",[id],function (err,rows){
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