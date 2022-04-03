var express = require('express');
var company = require('../controller/company');
const url = require("url");
var app = express();


function addPage() {
    return app.get('/tool',function (req,res){
        if(req.session.username&&req.session.role=="admin"){
            company.selectAll().then(data=>{
                res.render("./tools/1_choose_company",{"company":data});
            })
           
        }else {
            res.redirect("/");
        }

    });
}

module.exports={
    "addPage":addPage,
}
