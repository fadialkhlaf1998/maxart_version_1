var express = require('express');
var file_writer = require('../controller/file_writer');
var app_key = require('../controller/app_key');
const url = require("url");
var app = express();


function createDirectory() {
    return app.post('/api/create-directory',function (req,res){
        if(req.session.username&&req.session.role=="admin"){
            console.log(req.body.company_id);
          
            app_key.selectByCompanyId(req.body.company_id).then(result=>{
                req.session.codeGenerator = new Object();
                req.session.company_id = req.body.company_id;
                req.session.codeGenerator.apiKey = result[0].public_key;
                req.session.codeGenerator.folderName = req.body.company+Date.now();
                file_writer.createDirectory(req.session.codeGenerator.folderName);
                res.status(200);
                res.send("sucsesfully");
                res.end();
            }).catch(err=>{
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

module.exports={
    "createDirectory":createDirectory,
}
