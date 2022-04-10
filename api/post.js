var express = require('express');
var entity = require('../controller/post');
var post_type = require('../controller/post_type');
const url = require("url");
var app = express();


function  get(){
    return app.get('/api/post', (req, res, next) => {
        if(req.session.role=="sub_admin"){
        entity.selectAll(req.session.company_id).then(value => {
            res.status(200);
            res.send(value);
            res.end();
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

function  getSpecification(){
    return app.get('/api/post-specification', (req, res, next) => {
        if(req.session.role=="sub_admin"){
            var url_parts = url.parse(req.url, true);
            var query = url_parts.query;
        entity.selectAllByPostType(query.id,req.session.company_id).then(value => {
            res.status(200);
            res.send(value);
            res.end();
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


function  post(){
    return app.post('/api/post', (req, res, next) => {
        if(req.session.role=="sub_admin"){
            entity.insert(req.session.company_id,req.body.parent_1,req.body.parent_2,req.body.parent_3,
                req.body.parent_4,req.body.parent_5,req.body.post_type_id,req.body.publish,req.body.search,
                req.body.title,req.body.sub_title,req.body.image,req.body.sku,req.body.slug,req.body.price,req.body.regular_price,
                req.body.description,req.body.images,req.body.availability,req.body.meta_title,req.body.meta_description,req.body.position).then(value => {
                res.status(200);
                res.send(value);
                res.end();
            }).catch(err =>{
                res.status(500);
                res.send(err.sqlMessage);
                res.end();
            });
        }else{
            res.redirect("/");
        }
    });
}

function  put(){
    return app.put('/api/post', (req, res, next) => {
        if(req.session.role=="sub_admin"){
            entity.update(req.session.company_id,req.body.parent_1,req.body.parent_2,req.body.parent_3,
                req.body.parent_4,req.body.parent_5,req.body.post_type_id,req.body.publish,req.body.search,
                req.body.title,req.body.sub_title,req.body.image,req.body.sku,req.body.slug,req.body.price,req.body.regular_price,
                req.body.description,req.body.images,req.body.availability,req.body.meta_title,req.body.meta_description,req.body.position,req.body.id).then(value => {
                res.status(200);
                res.send(value);
                res.end();
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

function  _delete(){
    return app.delete('/api/post', (req, res, next) => {
        if(req.session.role=="sub_admin"){
        entity._delete(req.session.company_id,req.body.id).then(value => {
            res.status(200);
            res.send(value);
            res.end();
        }).catch(err =>{
            console.log(err);
            res.status(500);
            res.send(err);
            res.end();
        });
        }else{
            res.redirect("/");
        }
        
    });
}

function selectJsonDataByPostId() {
    return app.get('/api/json-data',function (req,res){
        if(req.session.username&&req.session.role=="sub_admin"){
            var url_parts = url.parse(req.url, true);
            var query = url_parts.query;
            entity.selectJsonDataByPostId(query.id).then(value => {
                res.status(200);
                res.send(value);
                res.end();
            }).catch(err =>{
                console.log(err);
                res.status(500);
                res.send(err);
                res.end();
            });
        }else {
            res.redirect("/");
        }

    });
}
function insertJsonDataByPostId() {
    return app.post('/api/json-data',function (req,res){
        if(req.session.username&&req.session.role=="sub_admin"){
            entity.insertJsonDataByPostId(req.body.post_id,req.body.position,req.body.data).then(value => {
                res.status(200);
                res.send(value);
                res.end();
            }).catch(err =>{
                console.log(err);
                res.status(500);
                res.send(err);
                res.end();
            });
        }else {
            res.redirect("/");
        }

    });
}

function updatetJsonDataByPostId() {
    return app.put('/api/json-data',function (req,res){
        if(req.session.username&&req.session.role=="sub_admin"){
            entity.updatetJsonDataByPostId(req.body.post_id,req.body.position,req.body.data,req.body.id).then(value => {
                res.status(200);
                res.send(value);
                res.end();
            }).catch(err =>{
                console.log(err);
                res.status(500);
                res.send(err);
                res.end();
            });
        }else {
            res.redirect("/");
        }

    });
}

function deleteJsonDataByPostId() {
    return app.delete('/api/json-data',function (req,res){
        if(req.session.username&&req.session.role=="sub_admin"){
            entity.deleteJsonDataByPostId(req.body.id).then(value => {
                res.status(200);
                res.send(value);
                res.end();
            }).catch(err =>{
                console.log(err);
                res.status(500);
                res.send(err);
                res.end();
            });
        }else {
            res.redirect("/");
        }

    });
}


function viewPage() {
    return app.get('/post',function (req,res){
        if(req.session.username&&req.session.role=="sub_admin"){
            res.render("post",{types:req.session.types});
        }else {
            res.redirect("/");
        }

    });
}
function addPage() {
    return app.get('/add-post',function (req,res){
        if(req.session.username&&req.session.role=="sub_admin"){
            post_type.selectAll(req.session.company_id).then(post_types=>{
                entity.selectAll(req.session.company_id).then(posts=>{
                    res.render("add_post",{"post_type":post_types,"post":posts,types:req.session.types});
                })
            })
           
        }else {
            res.redirect("/");
        }

    });
}
function editPage() {
    return app.get('/edit-post',function (req,res){
        if(req.session.username&&req.session.role=="sub_admin"){
            var url_parts = url.parse(req.url, true);
            var query = url_parts.query;
            entity.selectByid(req.session.company_id,query.id).then(function (rows) {
                post_type.selectAll(req.session.company_id).then(post_types=>{
                    entity.selectAll(req.session.company_id).then(posts=>{
                        res.render("edit_post",{data:rows[0],"post_type":post_types,"post":posts,types:req.session.types});
                    })
                })
               
            });
        }else {
            res.redirect("/");
        }

    });
}

function viewPageSpecification() {
    return app.get('/post-specification',function (req,res){
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;
        if(req.session.username&&req.session.role=="sub_admin"){
            res.render("post_specification",{types:req.session.types,id:query.id});
        }else {
            res.redirect("/");
        }

    });
}
function addPageSpecification() {
    return app.get('/add-post-specification',function (req,res){
        if(req.session.username&&req.session.role=="sub_admin"){
            var url_parts = url.parse(req.url, true);
            var query = url_parts.query;
            post_type.selectAll(req.session.company_id).then(post_types=>{
                entity.selectAll(req.session.company_id).then(posts=>{
                    res.render("add_post_specification",{"post_type":post_types,"post":posts,types:req.session.types,id:query.id});
                })
            })
           
        }else {
            res.redirect("/");
        }

    });
}
function editPageSpecification() {
    return app.get('/edit-post-specification',function (req,res){
        if(req.session.username&&req.session.role=="sub_admin"){
            var url_parts = url.parse(req.url, true);
            var query = url_parts.query;
            entity.selectByid(req.session.company_id,query.id).then(function (rows) {
                post_type.selectAll(req.session.company_id).then(post_types=>{
                    entity.selectAll(req.session.company_id).then(posts=>{
                        res.render("edit_post_specification",{data:rows[0],"post_type":post_types,"post":posts,types:req.session.types,id:query.type_id});
                    })
                })
               
            });
        }else {
            res.redirect("/");
        }

    });
}

function help() {
    return app.get('/maxart-help',function (req,res){
        if(req.session.username&&req.session.role=="sub_admin"){
            res.render("help",{types:req.session.types,company_id:req.session.company_id});
        }else {
            res.redirect("/");
        }

    });
}

module.exports={
    "viewPage":viewPage,
    "addPage":addPage,
    "editPage":editPage,
    "post":post,
    "get":get,
    "_delete":_delete,
    "put":put,
    "addPageSpecification":addPageSpecification,
    "viewPageSpecification":viewPageSpecification,
    "editPageSpecification":editPageSpecification,
    "getSpecification":getSpecification,
    "help":help,
    "selectJsonDataByPostId":selectJsonDataByPostId,
    "insertJsonDataByPostId":insertJsonDataByPostId,
    "updatetJsonDataByPostId":updatetJsonDataByPostId,
    "deleteJsonDataByPostId":deleteJsonDataByPostId,
}
