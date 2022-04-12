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

function updateLanguageParent(id){
return new Promise((resolve, reject) => {
    db_config.connection.query("update post set language_parent = id where id =?",[id],function (err,rows){
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

function insert(company_id,parent_1,parent_2,parent_3,parent_4,parent_5,post_type_id,publish,search,title,sub_title,image,sku,slug,price,regular_price,description,images,availability,meta_title,meta_description,position,locale,language_parent) {
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
        db_config.connection.query("insert into post (company_id,parent_1,parent_2,parent_3,parent_4,parent_5,post_type_id,publish,search,title,sub_title,image,sku,slug,price,regular_price,description,availability,meta_title,meta_description,position,locale,language_parent) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[company_id,parent_1,parent_2,parent_3,parent_4,parent_5,post_type_id,publish,search,title,sub_title,image,sku,slug,price,regular_price,description,availability,meta_title,meta_description,position,locale,language_parent],function (err,rows){
            if(err){
                reject(err);
            }else {
                updateLanguageParent(rows.insertId);
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

function insertLanguage(company_id,parent_1,parent_2,parent_3,parent_4,parent_5,post_type_id,publish,search,title,sub_title,image,sku,slug,price,regular_price,description,availability,meta_title,meta_description,position,locale,language_parent,json_data) {
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
        if(parent_1.length==0){
            parent_1=null;
        }
        if(parent_2.length==0){
            parent_2=null;
        }
        if(parent_3.length==0){
            parent_3=null;
        }
        if(parent_4.length==0){
            parent_4=null;
        }
        if(parent_5.length==0){
            parent_5=null;
        }
        console.log(parent_1);
        db_config.connection.query("insert into post (company_id,parent_1,parent_2,parent_3,parent_4,parent_5,post_type_id,publish,search,title,sub_title,image,sku,slug,price,regular_price,description,availability,meta_title,meta_description,position,locale,language_parent) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[company_id,parent_1,parent_2,parent_3,parent_4,parent_5,post_type_id,publish,search,title,sub_title,image,sku,slug,price,regular_price,description,availability,meta_title,meta_description,position,locale,language_parent],function (err,rows){
            if(err){
                reject(err);
            }else {
                // if(images.length>0){
                //     images.forEach(element => {
                //         insert_image(element,rows.insertId);
                //     });
                // }
                if(json_data.length>0){
                    json_data.forEach(element => {
                        console.log(element.position+" | "+element.body);
                        insertJsonDataByPostId(rows.insertId,element.position,element.body);
                    });
                }
                resolve(rows);
              
            }
        })
    });
}


function updateLanguage(company_id,parent_1,parent_2,parent_3,parent_4,parent_5,post_type_id,publish,search,title,sub_title,image,sku,slug,price,regular_price,description,availability,meta_title,meta_description,position,locale,json_data,id) {
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
        if(parent_1.length==0){
            parent_1=null;
        }
        if(parent_2.length==0){
            parent_2=null;
        }
        if(parent_3.length==0){
            parent_3=null;
        }
        if(parent_4.length==0){
            parent_4=null;
        }
        if(parent_5.length==0){
            parent_5=null;
        }
        db_config.connection.query("update post set company_id=?,parent_1=?,parent_2=?,parent_3=?,parent_4=?,parent_5=?,post_type_id=?,publish=?,search=?,title=?,sub_title=?,image=?,sku=?,slug=?,price=?,regular_price=?,description=?,availability=?,meta_title=?,meta_description=?,position=?,locale=? where id=?",[company_id,parent_1,parent_2,parent_3,parent_4,parent_5,post_type_id,publish,search,title,sub_title,image,sku,slug,price,regular_price,description,availability,meta_title,meta_description,position,locale,id],function (err,rows){
            if(err){
                reject(err);
            }else {
                // delete_image(id).then(result=>{
                //     if(images.length>0){
                //         images.forEach(element => {
                //             insert_image(element,id);
                //         });
                //     }
                // });
                if(json_data.length>0){
                    json_data.forEach(element => {
                        console.log(id+","+element.position+","+element.body+","+element.i)
                        updatetJsonDataByPostId(id,element.position,element.body,element.id);
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
       
        // console.log(description)
        var query =db_config.connection.query("update post set company_id=?,parent_1=?,parent_2=?,parent_3=?,parent_4=?,parent_5=?,post_type_id=?,publish=?,search=?,title=?,sub_title=?,image=?,sku=?,slug=?,price=?,regular_price=?,description=?,availability=?,meta_title=?,meta_description=?,position=? where id=? OR language_parent=?",[company_id,parent_1,parent_2,parent_3,parent_4,parent_5,post_type_id,publish,search,title,sub_title,image,sku,slug,price,regular_price,description,availability,meta_title,meta_description,position,id,id],function (err,rows){
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
        // console.log(query.sql)
        // console.log(query)
        // console.log(query.values)
    });
}

function _delete(company_id,id) {

    return new Promise((resolve, reject) => {
        delete_image(id).then(result=>{
            db_config.connection.query("SET foreign_key_checks = 0;delete from post where id=52 and company_id=10;set foreign_key_checks = 1;",[id,company_id],function (err,rows){
                if(err){
                    reject(err);
                }else {
                    resolve(rows);
                }
            })
        })
    });
}
function selectJsonDataByPostId(id) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("select CONVERT(data USING utf8) as data,id,position from json_data where post_id = ? order by position ASC",[id],function (err,rows){
            if(err){
                reject(err);
            }else {
                resolve(rows);
            }
        })
    });
}

function selectSinglePostLanguage(id,locale) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("select * from post where language_parent = ? and locale=? order by position ASC",[id,locale],function (err,rows){
            if(err){
                reject(err);
            }else {
                resolve(rows);
            }
        })
    });
}
function selectPostLanguage(id) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("select * from post where language_parent = ? and locale !='en' order by position ASC",[id],function (err,rows){
            if(err){
                reject(err);
            }else {
                resolve(rows);
            }
        })
    });
}

function insertJsonDataByPostId(id,position,data) {
    return new Promise((resolve, reject) => {
        if(position){

        }else{
            position=null;
        }
        db_config.connection.query("insert into json_data (post_id,position,data) values (?,?,?)",[id,position,data],function (err,rows){
            if(err){
                reject(err);
            }else {
                db_config.connection.query("select * from post where language_parent=? and id !=?",[id,id],function (err,langs){
                    if(err){
                        reject(err);
                    }else {
                        console.log(langs)
                        if(langs.length>0){
                            langs.forEach(element => {
                            
                                db_config.connection.query("insert into json_data (post_id,position,data) values (?,?,?)",[element.id,position,data],function (err,rows){
                                    if(err){
                                        reject(err);
                                    }else {
                                        //resolve(rows);
                                    }
                                })
                            });
                        }
                        resolve(rows);
                    }
                })
                
            }
        })
    });
}
function updatetJsonDataByPostId(post_id,position,data,id) {
    return new Promise((resolve, reject) => {
        if(position){

        }else{
            position=null;
        }
        db_config.connection.query("update json_data set post_id=?,position=?,data=? where id=?",[post_id,position,data,id],function (err,rows){
            if(err){
                reject(err);
            }else {
                resolve(rows);
            }
        })
    });
}
function deleteJsonDataByPostId(id) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("delete from json_data where id=?",[id],function (err,rows){
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
    "selectAllByPostType":selectAllByPostType,
    "selectJsonDataByPostId":selectJsonDataByPostId,
    "insertJsonDataByPostId":insertJsonDataByPostId,
    "updatetJsonDataByPostId":updatetJsonDataByPostId,
    "deleteJsonDataByPostId":deleteJsonDataByPostId,
    "insertLanguage":insertLanguage,
    "selectPostLanguage":selectPostLanguage,
    "selectSinglePostLanguage":selectSinglePostLanguage,
    "updateLanguage":updateLanguage,
}