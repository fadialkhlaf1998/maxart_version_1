var express = require('express');
var admin = require('../controller/sub_admin');
var company = require('../controller/company');
const url = require("url");
var app = express();


function  get(){
    return app.get('/api/sub-admin', (req, res, next) => {
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
    return app.post('/api/sub-admin', (req, res, next) => {
        if(req.session.role=="admin"){
            admin.insert(req.body.username,req.body.password,req.body.company_id).then(value => {
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
    return app.put('/api/sub-admin', (req, res, next) => {
        if(req.session.role=="admin"){
            admin.update(req.body.username,req.body.password,req.body.company_id,req.body.id).then(value => {
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
    return app.delete('/api/sub-admin', (req, res, next) => {
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

function viewPage() {
    return app.get('/sub-admin',function (req,res){
        if(req.session.username&&req.session.role=="admin"){
            res.render("sub_admin");
        }else {
            res.redirect("/");
        }

    });
}
function addPage() {
    return app.get('/add-sub-admin',function (req,res){
        if(req.session.username&&req.session.role=="admin"){
            company.selectAll().then(data=>{
                res.render("add_sub_admin",{"company":data});
            })
           
        }else {
            res.redirect("/");
        }

    });
}
function editPage() {
    return app.get('/edit-sub-admin',function (req,res){
        if(req.session.username&&req.session.role=="admin"){
            var url_parts = url.parse(req.url, true);
            var query = url_parts.query;
            admin.selectByid(query.id).then(function (rows) {

                company.selectAll().then(company_data=>{                    
                    res.render("edit_sub_admin",{"data":rows[0],"company":company_data});
                })
                
            });
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
}
