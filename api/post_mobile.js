var express = require('express');
var post_type = require('../controller/post_type');
var post_mobile = require('../controller/post_mobile');
const url = require("url");
var app = express();
const translate = require('translate-google');


async function make_translate(locale,data){
    if(locale=="en"){
        return data;
    }else{
        try{
            var result = await translate(data, {from:'en',to: locale,except:['id','parent_1','parent_2','parent_3','parent_4','parent_5','post_type_id','publish','search','image','sku','slug','price'
        ,'regular_price','likes','description','availability','company_id','wishlist','media','link','review','rate']});
            return result;
        }catch(err){
            console.error(err);
            return data;
        }
    }
    
}

function  post_type_mobile(){
    return app.post('/api/post-type-mobile', (req, res, next) => {
        if(req.session.role=="user"){
            post_type.selectAll(req.session.company_id).then(value => {
            var obj = new Object();
            obj.post_types = value;
            make_translate(req.body.locale,obj).then(result=>{
                res.status(200);
                res.send(result);
                res.end();
            });
            
        }).catch(err =>{
            res.status(500);
            res.send(err);
            res.end();
        });
        }else{
            res.redirect("/");
        }
        
    });
}


function  selectById(){
    return app.post('/api/post-by-id', (req, res, next) => {
        if(req.session.role=="user"){
            post_mobile.selectById(req.body.id,req.body.customer_id,req.session.company_id).then(value => {
            make_translate(req.body.locale,value).then(result=>{
                res.status(200);
                res.send(result);
                res.end();
            });
        }).catch(err =>{
            res.status(500);
            res.send(err);
            res.end();
        });
        }else{
            res.redirect("/");
        }
        
    });
}

function  selectByParent1(){
    return app.post('/api/post-by-parent-1', (req, res, next) => {
        if(req.session.role=="user"){
            post_mobile.selectByParent1(req.body.parent_id,req.body.customer_id,req.session.company_id).then(value => {
                make_translate(req.body.locale,value).then(result=>{
                    res.status(200);
                    res.send(result);
                    res.end();
                });
        }).catch(err =>{
            res.status(500);
            res.send(err);
            res.end();
        });
        }else{
            res.redirect("/");
        }
        
    });
}

function  selectByPostType(){
    return app.post('/api/post-by-post-type', (req, res, next) => {
        if(req.session.role=="user"){
            post_mobile.selectByPostType(req.body.id,req.body.customer_id,req.session.company_id).then(value => {
                make_translate(req.body.locale,value).then(result=>{
                    res.status(200);
                    res.send(result);
                    res.end();
                });
        }).catch(err =>{
            res.status(500);
            res.send(err);
            res.end();
        });
        }else{
            res.redirect("/");
        }
        
    });
}

function  selectByParent2(){
    return app.post('/api/post-by-parent-2', (req, res, next) => {
        if(req.session.role=="user"){
            post_mobile.selectByParent2(req.body.parent_id,req.body.customer_id,req.session.company_id).then(value => {
                make_translate(req.body.locale,value).then(result=>{
                    res.status(200);
                    res.send(result);
                    res.end();
                });
        }).catch(err =>{
            res.status(500);
            res.send(err);
            res.end();
        });
        }else{
            res.redirect("/");
        }
        
    });
}

function  selectByParent3(){
    return app.post('/api/post-by-parent-3', (req, res, next) => {
        if(req.session.role=="user"){
            post_mobile.selectByParent3(req.body.parent_id,req.body.customer_id,req.session.company_id).then(value => {
                make_translate(req.body.locale,value).then(result=>{
                    res.status(200);
                    res.send(result);
                    res.end();
                });
        }).catch(err =>{
            res.status(500);
            res.send(err);
            res.end();
        });
        }else{
            res.redirect("/");
        }
        
    });
}

function  selectByParent4(){
    return app.post('/api/post-by-parent-4', (req, res, next) => {
        if(req.session.role=="user"){
            post_mobile.selectByParent4(req.body.parent_id,req.body.customer_id,req.session.company_id).then(value => {
                make_translate(req.body.locale,value).then(result=>{
                    res.status(200);
                    res.send(result);
                    res.end();
                });
        }).catch(err =>{
            res.status(500);
            res.send(err);
            res.end();
        });
        }else{
            res.redirect("/");
        }
        
    });
}

function  selectByParent5(){
    return app.post('/api/post-by-parent-5', (req, res, next) => {
        if(req.session.role=="user"){
            post_mobile.selectByParent5(req.body.parent_id,req.body.customer_id,req.session.company_id).then(value => {
                make_translate(req.body.locale,value).then(result=>{
                    res.status(200);
                    res.send(result);
                    res.end();
                });
        }).catch(err =>{
            res.status(500);
            res.send(err);
            res.end();
        });
        }else{
            res.redirect("/");
        }
        
    });
}

function  selectByParent5(){
    return app.post('/api/post-by-parent-5', (req, res, next) => {
        if(req.session.role=="user"){
            post_mobile.selectByParent5(req.body.parent_id,req.body.customer_id,req.session.company_id).then(value => {
                make_translate(req.body.locale,value).then(result=>{
                    res.status(200);
                    res.send(result);
                    res.end();
                });
        }).catch(err =>{
            res.status(500);
            res.send(err);
            res.end();
        });
        }else{
            res.redirect("/");
        }
        
    });
}


function  search(){
    return app.post('/api/post-search', (req, res, next) => {
        if(req.session.role=="user"){
            post_mobile.search(req.body.query,req.body.post_type_id,req.body.customer_id,req.session.company_id).then(value => {
                make_translate(req.body.locale,value).then(result=>{
                    res.status(200);
                    res.send(result);
                    res.end();
                });
        }).catch(err =>{
            res.status(500);
            res.send(err);
            res.end();
        });
        }else{
            res.redirect("/");
        }
        
    });
}



module.exports={
 "post_type_mobile":post_type_mobile,
 "selectById":selectById,
 "selectByParent1":selectByParent1,
 "selectByParent2":selectByParent2,
 "selectByParent3":selectByParent3,
 "selectByParent4":selectByParent4,
 "selectByParent5":selectByParent5,
 "search":search,
 "selectByPostType":selectByPostType,
}
