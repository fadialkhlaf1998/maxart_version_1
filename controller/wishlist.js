const db_config = require("./db_config");
const app_key = require("./app_key");


function selectByCustomerId(customer_id) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("select * from post where id in (select post_id from wishlist where customer_id=?)",[customer_id],function (err,rows){
            if(err){
                reject(err);
            }else {
                var obj = new Object();
                obj.posts= rows;
                resolve(obj);
            }
        })
    });
}

function selectCart(post_id_array) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("select * from post where id in ("+db_config.connection.escape(post_id_array)+")",function (err,rows){
            if(err){
                reject(err);
            }else {
                var obj = new Object();
                obj.posts= rows;
                resolve(obj);
            }
        })
    });
}


function insert(customer_id,post_id) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("insert into wishlist (customer_id,post_id) values (?,?)",[customer_id,post_id],function (err,rows){
            if(err){
                reject(err);
            }else {
                resolve(rows);
            }
        })
    });
}


function deleteFromWishlist(customer_id,post_id) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("delete from wishlist where customer_id=? and post_id=?",[customer_id,post_id],function (err,rows){
            if(err){
                reject(err);
            }else {
                resolve(rows);
            }
        })
    });
}

module.exports={
    "selectByCustomerId": selectByCustomerId,
    "insert":insert,
    "deleteFromWishlist":deleteFromWishlist,
    "selectCart":selectCart,
}