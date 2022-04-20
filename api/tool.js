var express = require('express');
var company = require('../controller/company');
var post_type = require('../controller/post_type');
const url = require("url");
var app = express();


function choose_company() {
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

function main_data() {
    return app.get('/main-data',function (req,res){
        if(req.session.username&&req.session.role=="admin"){
            post_type.selectAll(req.session.company_id).then(data=>{
                res.render("./tools/2_main_data",{"types":data});
            })
           
        }else {
            res.redirect("/");
        }

    });
}

module.exports={
    "choose_company":choose_company,
    "main_data":main_data,
}
