const db_config = require("./db_config");


function selectAll(id) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("select p.*,pt.name as post_type from post p inner join post_type pt on pt.id = p.post_type_id where p.company_id=? order by p.position ASC",[id],function (err,rows){
            if(err){
                reject(err);
            }else {
                resolve(rows);
            }
        })
    });
}

function selectAllByPostType(post_type_id,id) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("select p.*,pt.name as post_type from post p inner join post_type pt on pt.id = p.post_type_id where p.post_type_id=? and p.company_id=? order by p.position ASC",[post_type_id,id],function (err,rows){
            if(err){
                reject(err);
            }else {
                resolve(rows);
            }
        })
    });
}


function selectAllImages(id) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("select link from media where post_id = ?",[id],function (err,rows){
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
        db_config.connection.query("select * from post where id =? and company_id=?",[id,company_id],function (err,rows){
            if(err){
                reject(err);
            }else {
                selectAllImages(rows[0].id).then(images=>{

                    rows[0].images=images;
                    console.log(rows[0]);
                    resolve(rows);
                });
                
            }
        })
    });
}

function insert_image(link,post_id) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("insert into media (link,post_id) values (?,?)",[link,post_id],function (err,rows){
            if(err){
                reject(err);
            }else {
                resolve(rows);
            }
        })
    });
}

function delete_image(post_id) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("delete from media where post_id=?",[post_id],function (err,rows){
            if(err){
                reject(err);
            }else {
                resolve(rows);
            }
        })
    });
}

function insert(company_id,parent_1,parent_2,parent_3,parent_4,parent_5,post_type_id,publish,search,title,sub_title,image,sku,slug,price,regular_price,description,images,availability,meta_title,meta_description,position) {
    return new Promise((resolve, reject) => {
        if(price){

        }else{
            price = null;
        }
        if(regular_price){

        }else{
            regular_price = null;
        }
        if(availability){

        }else{
            availability = null;
        }
        if(position){

        }else{
            position = null;
        }
        db_config.connection.query("insert into post (company_id,parent_1,parent_2,parent_3,parent_4,parent_5,post_type_id,publish,search,title,sub_title,image,sku,slug,price,regular_price,description,availability,meta_title,meta_description,position) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[company_id,parent_1,parent_2,parent_3,parent_4,parent_5,post_type_id,publish,search,title,sub_title,image,sku,slug,price,regular_price,description,availability,meta_title,meta_description,position],function (err,rows){
            if(err){
                reject(err);
            }else {
                if(images.length>0){
                    images.forEach(element => {
                        insert_image(element,rows.insertId);
                    });
                }
                resolve(rows);
              
            }
        })
    });
}

function update(company_id,parent_1,parent_2,parent_3,parent_4,parent_5,post_type_id,publish,search,title,sub_title,image,sku,slug,price,regular_price,description,images,availability,meta_title,meta_description,position,id) {
    return new Promise((resolve, reject) => {
        if(price){

        }else{
            price = null;
        }
        if(regular_price){

        }else{
            regular_price = null;
        }
        if(availability){

        }else{
            availability = null;
        }
        if(position){

        }else{
            position = null;
        }
        console.log(description)
        var query =db_config.connection.query("update post set company_id=?,parent_1=?,parent_2=?,parent_3=?,parent_4=?,parent_5=?,post_type_id=?,publish=?,search=?,title=?,sub_title=?,image=?,sku=?,slug=?,price=?,regular_price=?,description=?,availability=?,meta_title=?,meta_description=?,position=? where id=?",[company_id,parent_1,parent_2,parent_3,parent_4,parent_5,post_type_id,publish,search,title,sub_title,image,sku,slug,price,regular_price,description,availability,meta_title,meta_description,position,id],function (err,rows){
            if(err){
                reject(err);
            }else {
                delete_image(id).then(result=>{
                    if(images.length>0){
                        images.forEach(element => {
                            insert_image(element,id);
                        });
                    }
                });
                resolve(rows);
            }
        });
        console.log(query.sql)
        console.log(query)
        console.log(query.values)
    });
}

function _delete(company_id,id) {

    return new Promise((resolve, reject) => {
        delete_image(id).then(result=>{
            db_config.connection.query("delete from post where id=? and company_id=?",[id,company_id],function (err,rows){
                if(err){
                    reject(err);
                }else {
                    resolve(rows);
                }
            })
        })
    });
}

module.exports={
    "selectAll": selectAll,
    "insert":insert,
    "update":update,
    "_delete":_delete,
    "selectByid":selectByid,
    "selectAllByPostType":selectAllByPostType,
}