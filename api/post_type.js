var express = require('express');
var entity = require('../controller/post_type');
const url = require("url");
var app = express();


function get() {
    return app.get('/api/post-type', (req, res, next) => {
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


function post() {
    return app.post('/api/post-type', (req, res, next) => {
        if (req.session.role == "sub_admin") {
            entity.insert(req.body.name, req.session.company_id).then(value => {
                entity.selectAll(req.session.company_id).then(newvalue => {
                    req.session.types = newvalue;
                    res.status(200);
                    res.send(value);
                    res.end();
                });
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

function put() {
    return app.put('/api/post-type', (req, res, next) => {
        if (req.session.role == "sub_admin") {
            entity.update(req.body.name, req.session.company_id, req.body.id).then(value => {
                entity.selectAll(req.session.company_id).then(newvalue => {
                    req.session.types = newvalue;
                    res.status(200);
                    res.send(value);
                    res.end();
                });
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

function _delete() {
    return app.delete('/api/post-type', (req, res, next) => {
        if (req.session.role == "sub_admin") {
            entity._delete(req.session.company_id, req.body.id).then(value => {
                entity.selectAll(req.session.company_id).then(newvalue => {
                    req.session.types = newvalue;
                    res.status(200);
                    res.send(value);
                    res.end();
                });
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

function viewPage() {
    return app.get('/post-type', function (req, res) {
        if (req.session.username && req.session.role == "sub_admin") {
            res.render("post_type", { types: req.session.types });
        } else {
            res.redirect("/");
        }

    });
}
function addPage() {
    return app.get('/add-post-type', function (req, res) {
        if (req.session.username && req.session.role == "sub_admin") {
            res.render("add_post_type", { types: req.session.types });
        } else {
            res.redirect("/");
        }

    });
}
function editPage() {
    return app.get('/edit-post-type', function (req, res) {
        if (req.session.username && req.session.role == "sub_admin") {
            var url_parts = url.parse(req.url, true);
            var query = url_parts.query;
            entity.selectByid(req.session.company_id, query.id).then(function (rows) {
                res.render("edit_post_type", { data: rows[0], types: req.session.types });
            });
        } else {
            res.redirect("/");
        }

    });
}




module.exports = {
    "viewPage": viewPage,
    "addPage": addPage,
    "editPage": editPage,
    "post": post,
    "get": get,
    "_delete": _delete,
    "put": put,
}
