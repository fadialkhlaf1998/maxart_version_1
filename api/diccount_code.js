var express = require('express');
var entity = require('../controller/disccount_code');
const url = require("url");
var app = express();


function  get(){
    return app.get('/api/discount-code', (req, res, next) => {
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


function  post(){
    return app.post('/api/discount-code', (req, res, next) => {
        if(req.session.role=="sub_admin"){
            entity.insert(req.body.code,req.body.amount,req.session.company_id).then(value => {
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
    return app.put('/api/discount-code', (req, res, next) => {
        if(req.session.role=="sub_admin"){
            entity.update(req.body.code,req.body.amount,req.body.id).then(value => {
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
    return app.delete('/api/discount-code', (req, res, next) => {
        if(req.session.role=="sub_admin"){
        entity._delete(req.session.company_id,req.body.id).then(value => {
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

function  checkCode(){
    return app.post('/api/check-discount-code', (req, res, next) => {
        if(req.session.role=="user"){
        entity.checkCode(req.body.code,req.session.company_id).then(value => {
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
    return app.get('/discount-code',function (req,res){
        if(req.session.username&&req.session.role=="sub_admin"){
            res.render("discount_code",{types:req.session.types});
        }else {
            res.redirect("/");
        }

    });
}
function addPage() {
    return app.get('/add-discount-code',function (req,res){
        if(req.session.username&&req.session.role=="sub_admin"){
            res.render("add_discount_code",{types:req.session.types});
        }else {
            res.redirect("/");
        }

    });
}
function editPage() {
    return app.get('/edit-discount-code',function (req,res){
        if(req.session.username&&req.session.role=="sub_admin"){
            var url_parts = url.parse(req.url, true);
            var query = url_parts.query;
            entity.selectByid(req.session.company_id,query.id).then(function (rows) {
                res.render("edit_discount_code",{data:rows[0],types:req.session.types});
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
    "checkCode":checkCode,
}
