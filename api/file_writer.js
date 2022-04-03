var express = require('express');
var file_writer = require('../controller/file_writer');
const url = require("url");
var app = express();


function createDirectory() {
    return app.post('/api/create-directory',function (req,res){
        if(req.session.username&&req.session.role=="admin"){
            console.log(req.body.company_id);
            file_writer.createDirectory(req.body.company);
        }else {
            res.redirect("/");
        }
    });
}

module.exports={
    "createDirectory":createDirectory,
}
