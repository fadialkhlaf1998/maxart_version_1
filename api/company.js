var express = require('express');
var entity = require('../controller/company');
const url = require("url");
var app = express();


function  get(){
    return app.get('/api/company', (req, res, next) => {
        if(req.session.role=="admin"){
        entity.selectAll().then(value => {
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
    return app.post('/api/company', (req, res, next) => {
        if(req.session.role=="admin"){
            entity.insert(req.body.name,req.body.is_active).then(value => {
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
    return app.put('/api/company', (req, res, next) => {
        if(req.session.role=="admin"){
            entity.update(req.body.name,req.body.is_active,req.body.id).then(value => {
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
    return app.delete('/api/company', (req, res, next) => {
        if(req.session.role=="admin"){
        entity._delete(req.body.id).then(value => {
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
    return app.get('/company',function (req,res){
        if(req.session.username&&req.session.role=="admin"){
            res.render("company");
        }else {
            res.redirect("/");
        }

    });
}
function addPage() {
    return app.get('/add-company',function (req,res){
        if(req.session.username&&req.session.role=="admin"){
            res.render("add_company");
        }else {
            res.redirect("/");
        }

    });
}
function editPage() {
    return app.get('/edit-company',function (req,res){
        if(req.session.username&&req.session.role=="admin"){
            var url_parts = url.parse(req.url, true);
            var query = url_parts.query;
            entity.selectByid(query.id).then(function (rows) {
                res.render("edit_company",{data:rows[0]});
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
