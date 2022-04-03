var express = require('express');
var app_key = require('../controller/app_key');
const url = require("url");
var app = express();


function  selectByPublicKey(){
    return app.post('/api/app-key', (req, res, next) => {
            app_key.selectByPublicKey(req.body.public_key).then(value => {              
                req.session.role="user";
                req.session.company_id=value[0].company_id;
                res.status(200);
                res.send(value[0]);
                res.end();
            }).catch(err =>{
                console.log(err)
                res.status(500);
                res.send(err);
                res.end();
            });
       
        
    });
}

function  selectByCompanyId(){
    return app.post('/api/app-key-company-id', (req, res, next) => {
        if(req.session.role=="admin"){
            app_key.selectByCompanyId(req.body.company_id).then(value => {
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


module.exports={
    "selectByPublicKey":selectByPublicKey,
    "selectByCompanyId":selectByCompanyId,
}
