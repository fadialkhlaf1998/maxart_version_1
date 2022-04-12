const db_config = require("./db_config");

function orderNumber() {
    return  Date.now().toString();
}

function selectAll(id) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("select * from my_orders where company_id=?",[id],function (err,rows){
            if(err){
                reject(err);
            }else {
                resolve(rows);
            }
        })
    });
}

function selectCustomerOrders(id,company_id) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("select * from my_orders where company_id=? and company_id=?",[id,company_id],function (err,rows){
            if(err){
                reject(err);
            }else {
                resolve(rows);
            }
        })
    });
}

function selectById(company_id,id) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("select * from my_orders where company_id=? and id=?",[company_id,id],function (err,rows){
            if(err){
                reject(err);
            }else {
                resolve(rows);
            }
        })
    });
}

function insert(company_id,cutomer_id,first_name,last_name,address_1,address_2,phone,country,state,order_state,total,sub_total,shipping,discount) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("insert into my_orders (company_id,order_number,cutomer_id,first_name,last_name,address_1,address_2,phone,country,state,order_state,total,sub_total,shipping,discount) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [company_id,orderNumber(),cutomer_id,first_name,last_name,address_1,address_2,phone,country,state,order_state,total,sub_total,shipping,discount],function (err,rows){
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
        db_config.connection.query("delete from my_orders where id=? and company_id=?",[id,company_id],function (err,rows){
            if(err){
                reject(err);
            }else {
                resolve(rows);
            }
        })
    });
}

function deliver(company_id,id) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("update my_orders set order_state = 1 where id=? and company_id=?",[id,company_id],function (err,rows){
            if(err){
                reject(err);
            }else {
                resolve(rows);
            }
        })
    });
}

function refuse(company_id,id) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("update my_orders set order_state = -1 where id=? and company_id=?",[id,company_id],function (err,rows){
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
    "_delete":_delete,
    "deliver":deliver,
    "refuse":refuse,
    "selectById":selectById,
    "selectCustomerOrders":selectCustomerOrders,
}