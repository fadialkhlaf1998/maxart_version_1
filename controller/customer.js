const db_config = require("./db_config");
const nodemailer = require("nodemailer");


async function send_mail(msg,subject,email) {
    try {
        let transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "Digitalmarket@dayjour.net",
                pass: "vmwvdixwacckotuf",
            },
        });

        let info = await transporter.sendMail({
            from: "Digitalmarket@dayjour.net",
            to: email,
            subject: subject,
            text: msg,
            // html: "<b>Hello world?</b>",
        });
    }catch (e) {
        console.log("********************************");
        console.log(e);
    }

}


function selectAll() {
    return new Promise((resolve, reject) => {
        db_config.connection.query("select * from customer",function (err,rows){
            if(err){
                reject(err);
            }else {
                resolve(rows);
            }
        })
    });
}

function login(email,pass,company_id) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("select * from customer where email=? and password=? and company_id=? and is_active=1",[email,pass,company_id],function (err,rows){
            if(err){
                reject(err);
            }else {
                resolve(rows);
            }
        })
    });
}

function makeid() {
    var result           = '';
    var characters       = '0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 6; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

function signup(firstname,lastname,email,password,company_id) {
    return new Promise((resolve, reject) => {
        var code =makeid();
        db_config.connection.query("insert into customer (firstname,lastname,email,password,is_active,code,image,company_id,check_unique) values (?,?,?,?,?,?,?,?,?)",[firstname,lastname,email,password,0,code,null,company_id,email+company_id],function (err,rows){
            if(err){
                reject(err);
            }else {
                send_mail(code,"Verification code",email);
                resolve("200");
            }
        })
    });
}



function verifyEmail(email,code,company_id) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("select * from customer where email=? and code=? and is_active=0 and company_id=?",[email,code,company_id],function (err,rows) {
            if (err){
                resolve(err.sqlMessage);
            }else {
                if(rows.length>0){
                    db_config.connection.query("update customer set is_active=1 where id =?",[rows[0].id],function (err,rows1) {
                        if(err){
                            resolve(err.sqlMessage);
                        }else {
                            resolve("200");
                        }
                    });
                }else{
                    resolve("500");
                }
            }
        })
    });
}

function resendCode(email,company_id) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("select * from customer where email=? and is_active=0 and company_id=?",[email,company_id],function (err,rows) {
            if (err){
                resolve(err.sqlMessage);
            }else {
                send_mail(rows[0].code,"Verification code",email);
                resolve("200");
            }
        })
    });
}


function _delete(company_id,id) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("delete from customer where company_id=? and id = ?",[company_id,id],function (err,rows){
            if(err){
                reject(err);
            }else {
                resolve(rows);
            }
        })
    });
}

function uploadPhoto(image,company_id,id) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("update customer set image = ? where company_id = ? and id = ?",[image,company_id,id],function (err,rows){
            if(err){
                reject(err);
            }else {
                resolve(rows);
            }
        })
    });
}

function changePassword(password,company_id,id) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("update customer set password = ? where company_id = ? and id = ?",[password,company_id,id],function (err,rows){
            if(err){
                reject(err);
            }else {
                resolve("200");
            }
        })
    });
}

function forgotPassword(email,company_id) {
    return new Promise((resolve, reject) => {
        db_config.connection.query("select * from customer where email = ? and company_id = ?",[email,company_id],function (err,rows){
            if(err){
                reject(err);
            }else {
                if(rows.length>0){
                    send_mail(rows[0].password,"Maxart Support Team",email);
                    resolve("200");
                }else{
                    resolve("500");
                }
               
            }
        })
    });
}

module.exports={
    "selectAll": selectAll,
    "_delete":_delete,
    "login":login,
    "signup":signup,
    "verifyEmail":verifyEmail,
    "uploadPhoto":uploadPhoto,
    "changePassword":changePassword,
    "forgotPassword":forgotPassword,
    "resendCode":resendCode
}