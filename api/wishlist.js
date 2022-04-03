var express = require('express');
var entity = require('../controller/wishlist');
const url = require("url");
var app = express();

function  selectByCustomerId(){
    return app.post('/api/wishlist', (req, res, next) => {
        if(req.session.role=="user"){
            entity.selectByCustomerId(req.body.customer_id).then(value => {
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

function  selectCart(){
    return app.post('/api/cart', (req, res, next) => {
        if(req.session.role=="user"){
            entity.selectCart(req.body.array).then(value => {
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

function  insert(){
    return app.post('/api/add-wishlist', (req, res, next) => {
        if(req.session.role=="user"){
            entity.insert(req.body.customer_id,req.body.post_id).then(value => {
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

function  deleteFromWishlist(){
    return app.delete('/api/delete-wishlist', (req, res, next) => {
        if(req.session.role=="user"){
            entity.deleteFromWishlist(req.body.customer_id,req.body.post_id).then(value => {
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
    "selectByCustomerId":selectByCustomerId,
    "insert":insert,
    "deleteFromWishlist":deleteFromWishlist,
    "selectCart":selectCart,
}
