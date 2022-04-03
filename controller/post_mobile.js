const db_config = require("./db_config");


function selectByPostType(post_type_id,customer_id,company_id) {
    return new Promise((resolve, reject) => {
        
        db_config.connection.query("select p.*,CONVERT(p.description USING utf8) as string_description ,(select count(*) from wishlist w where w.post_id = p.id and w.customer_id = ?) as wishlist from post p where p.post_type_id = ? and p.company_id =?",[customer_id,post_type_id,company_id],function (err,rows){
            if(err){
                reject(err);
            }else {
                var obj = new Object();
                obj.posts=rows;
                resolve(obj);
            }
        })
    });
}

function getPostMedia(post_id) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("select link from media where post_id = ?",[post_id],function (err,rows){
            if(err){
                reject(err);
            }else {
                resolve(rows);
            }
        })
    });
}

function getReview(post_id) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("select r.*,c.firstname as firstname , c.lastname as lastname from review r inner join customer c on c.id=r.customer_id where r.post_id = ?",[post_id],function (err,rows){
            if(err){
                reject(err);
            }else {
                resolve(rows);
            }
        })
    });
}

function getRate(post_id) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("select r.*,c.firstname as firstname , c.lastname as lastname from rate r inner join customer c on c.id=r.customer_id where r.post_id = ?",[post_id],function (err,rows){
            if(err){
                reject(err);
            }else {
                resolve(rows);
            }
        })
    });
}

function selectByParent1(parent_id,customer_id,company_id){
    return new Promise((resolve, reject) => {
        db_config.connection.query("select p.*,CONVERT(p.description USING utf8) as string_description,(select count(*) from wishlist w where w.post_id = p.id and w.customer_id = ?) as wishlist from post p where p.parent_1 = ? and p.company_id =?",[customer_id,parent_id,company_id],function (err,rows){
            if(err){
                reject(err);
            }else {
                var obj = new Object();
                obj.posts=rows;
                resolve(obj);
            }
        })
    });
}
function selectByParent2(parent_id,customer_id,company_id){
    return new Promise((resolve, reject) => {
        console.log(parent_id);
        console.log(company_id);
        db_config.connection.query("select p.*,CONVERT(p.description USING utf8) as string_description,(select count(*) from wishlist w where w.post_id = p.id and w.customer_id = ?) as wishlist from post p where p.parent_2 = ? and p.company_id =?",[customer_id,parent_id,company_id],function (err,rows){
            if(err){
                reject(err);
            }else {
                var obj = new Object();
                obj.posts=rows;
                resolve(obj);
            }
        })
    });
}

function selectByParent3(parent_id,company_id){
    return new Promise((resolve, reject) => {
        db_config.connection.query("select p.*,CONVERT(p.description USING utf8) as string_description,(select count(*) from wishlist w where w.post_id = p.id and w.customer_id = ?) as wishlist from post p where p.parent_3 = ? and p.company_id =?",[customer_id,parent_id,company_id],function (err,rows){
            if(err){
                reject(err);
            }else {
                var obj = new Object();
                obj.posts=rows;
                resolve(obj);
            }
        })
    });
}
function selectByParent4(parent_id,company_id){
    return new Promise((resolve, reject) => {
        db_config.connection.query("select p.*,CONVERT(p.description USING utf8) as string_description,(select count(*) from wishlist w where w.post_id = p.id and w.customer_id = ?) as wishlist from post p where p.parent_4 = ? and p.company_id =?",[customer_id,parent_id,company_id],function (err,rows){
            if(err){
                reject(err);
            }else {
                var obj = new Object();
                obj.posts=rows;
                resolve(obj);
            }
        })
    });
}

function selectByParent5(parent_id,company_id){
    return new Promise((resolve, reject) => {
        db_config.connection.query("select p.*,CONVERT(p.description USING utf8) as string_description,(select count(*) from wishlist w where w.post_id = p.id and w.customer_id = ?) as wishlist from post p where p.parent_5 = ? and p.company_id =?",[customer_id,parent_id,company_id],function (err,rows){
            if(err){
                reject(err);
            }else {
                var obj = new Object();
                obj.posts=rows;
                resolve(obj);
            }
        })
    });
}

function selectById(id,customer_id,company_id){
    return new Promise((resolve, reject) => {
        db_config.connection.query("select p.* ,CONVERT(p.description USING utf8) as string_description,(select count(*) from wishlist w where w.post_id = p.id and customer_id = ?) as wishlist from post p where p.id = ? and p.company_id =?",[customer_id,id,company_id],function (err,rows){
            if(err){
                reject(err);
            }else {
                getPostMedia(id).then(medias=>{
                    getReview(id).then(reviews=>{
                        getRate(id).then(rates=>{
                            rows[0].media=medias;
                            rows[0].review=reviews;
                            rows[0].rate=rates;
                            var obj = new Object();
                            obj.posts=rows;
                            resolve(obj);
                        })
                    })
                   
                });
                
            }
        })
    });
}

function search(query,post_type_id,customer_id,company_id){
    return new Promise((resolve, reject) => {
        db_config.connection.query("select p.* ,CONVERT(p.description USING utf8) as string_description,(select count(*) from wishlist w where w.post_id = p.id and customer_id = ?) as wishlist from post p where p.post_type_id = ? and p.company_id =? and (p.title like ? or p.search like ?)",[customer_id,post_type_id,company_id,'%'+query+'%','%'+query+'%'],function (err,rows){
            if(err){
                reject(err);
            }else {
                var obj = new Object();
                obj.posts=rows;
                resolve(obj);
            }
        })
    });
}



module.exports={
    "selectByPostType":selectByPostType,
    "selectByParent1":selectByParent1,
    "selectByParent2":selectByParent2,
    "selectByParent3":selectByParent3,
    "selectByParent4":selectByParent4,
    "selectByParent5":selectByParent5,
    "selectById":selectById,
    "search":search
}