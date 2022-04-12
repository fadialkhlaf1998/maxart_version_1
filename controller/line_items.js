const db_config = require("./db_config");

function orderNumber() {
    return  Date.now().toString();
}

function selectAll(company_id,order_id) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("select li.*,p.* from line_items li inner join post p on p.id = li.post_id where li.company_id=? and li.order_id=?",[company_id,order_id],function (err,rows){
            if(err){
                reject(err);
            }else {
                resolve(rows);
            }
        })
    });
}

function insert(company_id,post_id,order_id,count) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("insert into my_orders (company_id,post_id,order_id,count) values (?,?,?,?)",
        [company_id,post_id,order_id,count],function (err,rows){
            if(err){
                reject(err);
            }else {
                updateAvalibilty(company_id,post_id,count);
                resolve(rows);
            }
        })
    });
}

function updateAvalibilty(company_id,post_id,count) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("update post set availability = availability - ? where id = ? and company_id = ?;",
        [count,post_id,company_id],function (err,rows){
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
}