var express = require('express');
var entity = require('../controller/customer');
const url = require("url");
var app = express();

function  signup(){
    return app.post('/api/customer-signup', (req, res, next) => {
        if(req.session.role=="user"){
            entity.signup(req.body.firstname,req.body.lastname,req.body.email,req.body.password,req.session.company_id).then(value => {
                if(value==200){
                    res.status(200);
                    res.send(value);
                    res.end();
                }else{
                    res.status(500);
                    res.end();
                }
                
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
    return app.post('/api/customer-login', (req, res, next) => {
        if(req.session.role=="user"){
            entity.login(req.body.email,req.body.password,req.session.company_id).then(value => {
                if(value.length>0){
                    res.status(200);
                    res.send(value[0]);
                    res.end();
                }else{
                    res.status(500);
                    res.end();
                }
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

function  verifyEmail(){
    return app.post('/api/customer-verify-email', (req, res, next) => {
        if(req.session.role=="user"){
            entity.verifyEmail(req.body.email,req.body.code,req.session.company_id).then(value => {
                if(value==200){
                    res.status(200);
                    res.send(value);
                    res.end();
                }else{
                    res.status(500);
                    res.end();
                }
                
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

function  resendCode(){
    return app.post('/api/resend-code', (req, res, next) => {
        if(req.session.role=="user"){
            entity.resendCode(req.body.email,req.session.company_id).then(value => {
                if(value==200){
                    res.status(200);
                    res.send(value);
                    res.end();
                }else{
                    res.status(500);
                    res.end();
                }
                
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
    return app.delete('/api/customer-delete-account', (req, res, next) => {
        if(req.session.role=="user"){
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



const multer = require('multer');
  
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads/');
    },
  
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage }).single("file");

function  uploadPhoto(){
    return app.put('/api/customer-upload-image',(req, res) => {
        if(req.session.role=="user"){
            upload(req,res,function(err) {
                if(err) {
                  res.status(500);
                  res.send("Error uploading file.");
                  res.end();
                  return ;
                  }
                  entity.uploadPhoto(req.file.filename,req.session.company_id,req.body.id).then(value => {
                      res.status(200);
                      res.send(value);
                      res.end();
                  }).catch(err =>{
                      res.status(500);
                      res.send(err);
                      res.end();
                  });
            });
        }else{
            res.redirect("/");
        }
      
      });
    
}

function  changePassword(){
    return app.put('/api/customer-change-password', (req, res, next) => {
        if(req.session.role=="user"){
            entity.changePassword(req.body.password,req.session.company_id,req.body.id).then(value => {
                if(value==200){
                    res.status(200);
                    res.send(value);
                    res.end();
                }else{
                    res.status(500);
                    res.end();
                }
                
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

function  forgotPassword(){
    return app.post('/api/customer-forgot-password', (req, res, next) => {
        if(req.session.role=="user"){
            entity.forgotPassword(req.body.email,req.session.company_id).then(value => {
                if(value==200){
                    res.status(200);
                    res.send(value);
                    res.end();
                }else{
                    res.status(500);
                    res.end();
                }
                
            }).catch(err=>{
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
    "_delete":_delete,
    "signup":signup,
    "login":login,
    "verifyEmail":verifyEmail,
    "uploadPhoto":uploadPhoto,
    "changePassword":changePassword,
    "forgotPassword":forgotPassword,
    "resendCode":resendCode,
}
