var express = require('express');
var admin = require('../controller/admin');
var sub_admin = require('../controller/sub_admin');
var post_type = require('../controller/post_type');
const url = require("url");
var app = express();


function  get(){
    return app.get('/api/admin', (req, res, next) => {
        if(req.session.role=="admin"){
            admin.selectAll().then(value => {
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
    return app.post('/api/admin', (req, res, next) => {
        if(req.session.role=="admin"){
            admin.insert(req.body.username,req.body.password).then(value => {
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
    return app.put('/api/admin', (req, res, next) => {
        if(req.session.role=="admin"){
            admin.update(req.body.username,req.body.password,req.body.id).then(value => {
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

    return app.delete('/api/admin', (req, res, next) => {
        if(req.session.role=="admin"){
            admin._delete(req.body.id).then(value => {
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
function  login(){
    return app.post('/api/login', (req, res, next) => {
        admin.selectByUsernameAndPass(req.body.username,req.body.pass).then(value => {
           
            if(value){
                req.session.username=req.body.username+Date.now()+"admin";
                req.session.myadminid=value.id;
                req.session.role="admin";
                res.redirect("/admin");
            }else{
                sub_admin.selectByUsernameAndPass(req.body.username,req.body.pass).then(value=>{
                    if(value){
                        req.session.username=req.body.username+Date.now()+"sub_admin";
                        req.session.myadminid=value.id;
                        req.session.company_id=value.company_id;
                        req.session.role="sub_admin";
                        post_type.selectAll(req.session.company_id).then(result=>{
                            req.session.types= result;
                            res.redirect("/post");
                        });
                        
                    }else{
                        res.redirect("/");
                    }
                    
                });
                console.log("sub_admin");
            }
            
        }).catch(err =>{
            res.redirect("/");
        });

    });
}

function  logout(){
    return app.post('/api/logout',function (req,res){
        console.log("*************************************")
        if(req.body.close_session)
            req.session.destroy();
    });
}

function view() {
    return app.get('/',function (req,res){
        res.render("index");
    });
}

function viewPage() {
    return app.get('/admin',function (req,res){
        if(req.session.username&&req.session.role=="admin"){
            res.render("admin");
        }else {
            res.redirect("/");
        }

    });
}
function addPage() {
    return app.get('/add-admin',function (req,res){
        if(req.session.username&&req.session.role=="admin"){
            res.render("add_admin");
        }else {
            res.redirect("/");
        }

    });
}
function editPage() {
    return app.get('/edit-admin',function (req,res){
        if(req.session.username&&req.session.role=="admin"){
            var url_parts = url.parse(req.url, true);
            var query = url_parts.query;
            admin.selectByid(query.id).then(function (rows) {
                res.render("edit_admin",{data:rows[0]});
            });
        }else {
            res.redirect("/");
        }

    });
}

module.exports={
    "login":login,
    "logout":logout,
    "view":view,
    "viewPage":viewPage,
    "addPage":addPage,
    "editPage":editPage,
    "post":post,
    "get":get,
    "_delete":_delete,
    "put":put,
}
