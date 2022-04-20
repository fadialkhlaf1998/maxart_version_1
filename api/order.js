var express = require('express');
var entity = require('../controller/order');
var line_items = require('../controller/line_items');
const url = require("url");
var app = express();


function get() {
    return app.get('/api/orders', (req, res, next) => {
        if (req.session.role == "sub_admin") {
            entity.selectAll(req.session.company_id).then(value => {
                res.status(200);
                res.send(value);
                res.end();
            }).catch(err => {
                res.status(500);
                res.send(err);
                res.end();
            });
        } else {
            res.redirect("/");
        }

    });
}

function selectCustomerOrders() {
    return app.post('/api/customer_orders', (req, res, next) => {
        if (req.session.role == "user") {
            entity.selectCustomerOrders(req.session.company_id,req.body.customer_id).then(value => {
                res.status(200);
                res.send(value);
                res.end();
            }).catch(err => {
                res.status(500);
                res.send(err);
                res.end();
            });
        } else {
            res.redirect("/");
        }

    });
}


function post() {
    return app.post('/api/order', (req, res, next) => {
        if (req.session.role == "user") {
            entity.insert(req.session.company_id,req.body.customer_id,req.body.first_name,req.body.last_name,req.body.address_1,req.body.address_2,
                req.body.phone,req.body.country,req.body.state,req.body.order_state,req.body.total,req.body.sub_total,req.body.shipping,req.body.discount).then(value => {
                    req.body.lineItems.forEach(elm=>{
                        line_items.insert(req.session.company_id,elm.post_id,value.insertId,elm.count);
                    });
                    res.status(200);
                    res.send(value);
                    res.end();
                    
            }).catch(err => {
                res.status(500);
                res.send(err.sqlMessage);
                res.end();
            });
        } else {
            res.redirect("/");
        }
    });
}

function deliver() {
    return app.post('/api/deliver-order', (req, res, next) => {
        if (req.session.role == "sub_admin") {
            entity.deliver(req.session.company_id,req.body.id).then(value => {
                    res.status(200);
                    res.send(value);
                    res.end();
               
            }).catch(err => {
                res.status(500);
                res.send(err.sqlMessage);
                res.end();
            });
        } else {
            res.redirect("/");
        }
    });
}

function refuse() {
    return app.post('/api/refuse-order', (req, res, next) => {
        if (req.session.role == "sub_admin") {
            entity.refuse(req.session.company_id,req.body.id).then(value => {
                    res.status(200);
                    res.send(value);
                    res.end();
                
            }).catch(err => {
                res.status(500);
                res.send(err.sqlMessage);
                res.end();
            });
        } else {
            res.redirect("/");
        }
    });
}

function getLineItems() {
    return app.get('/api/line-items', (req, res, next) => {
        if (req.session.role == "sub_admin"||req.session.role == "user") {
            var url_parts = url.parse(req.url, true);
            var query = url_parts.query;
            line_items.selectAll(req.session.company_id,query.order_id).then(value => {
                    res.status(200);
                    res.send(value);
                    res.end();
                
            }).catch(err => {
                res.status(500);
                res.send(err.sqlMessage);
                res.end();
            });
        } else {
            res.redirect("/");
        }
    });
}

function ViewLineItemsPage() {
    return app.get('/line-items', (req, res, next) => {
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;
        if (req.session.username && req.session.role == "sub_admin") {
            entity.selectById(req.session.company_id,query.order_id).then(order_resilt=>{
                res.render("line_items", { types: req.session.types ,order_id:query.order_id,order:order_resilt[0]});
            });
        } else {
            res.redirect("/");
        }
    });
}

function viewPage() {
    return app.get('/orders', function (req, res) {
        if (req.session.username && req.session.role == "sub_admin") {
            res.render("orders", { types: req.session.types });
        } else {
            res.redirect("/");
        }

    });
}


module.exports = {
    "viewPage": viewPage,
    "post": post,
    "get": get,
    "deliver": deliver,
    "refuse": refuse,
    "ViewLineItemsPage":ViewLineItemsPage,
    "getLineItems":getLineItems,
    "selectCustomerOrders":selectCustomerOrders,
}
