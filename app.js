var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

var admin = require("./api/admin");
var sub_admin = require("./api/sub_admin");
var company = require("./api/company");
var post_type = require("./api/post_type");
var post = require("./api/post");
var app_key = require("./api/app_key");
var disccount_code = require("./api/diccount_code");
var tool = require("./api/tool");
var file_writer = require("./api/file_writer");
var post_mobile = require("./api/post_mobile");
var customer = require("./api/customer");
var wishlist = require("./api/wishlist");
var order = require("./api/order");


const sessions = require('express-session');
const mysql = require('mysql');
const MySqlStore = require('express-mysql-session')(sessions);
var option={
  host     : 'localhost',
  port     :  3306,
  user     : 'root',
  password : '12345678',
  database : 'maxart',
};

var sessionConnection = mysql.createConnection(option);
var sessionStore = new MySqlStore({
  expiration: 10800000,
  createDatabaseTable: true,
  schema: {
    tableName: "sessiontbl",
    columnNames:{
      session_id:"session_id",
      expires:"expires",
      data:"data"
    }
  }
},sessionConnection);

const halfHour = 1000 * 300 * 600;
app.use(sessions({
  key: "keyin",
  secret: "therthsfsecaaagsgyfhrgfgrfrty84fwir767",
  store: sessionStore,
  saveUninitialized:true,
  cookie: { maxAge: halfHour },
  resave: true
}));

// app.use(cors({
//  origin: ["http://localhost:3000"],
//  methods: ["GET","POST"],
//  credentials: true
// }));

var session;


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/open', (req, res, next) => {
  req.session.user="sadasd";
  console.log(req.session)
  console.log(req.headers.cookie)
})

app.get('/show', (req, res, next) => {
  // req.session.user="sadasd";
  console.log(req.session)
  console.log(req.headers.cookie)
})

app.use(admin.login());
app.use(admin.logout());
app.use(admin.view());
app.use(admin.viewPage());
app.use(admin.addPage());
app.use(admin.editPage());
app.use(admin.post());
app.use(admin.put());
app.use(admin._delete());
app.use(admin.get());


app.use(sub_admin.viewPage());
app.use(sub_admin.addPage());
app.use(sub_admin.editPage());
app.use(sub_admin.post());
app.use(sub_admin.put());
app.use(sub_admin._delete());
app.use(sub_admin.get());

app.use(company.viewPage());
app.use(company.addPage());
app.use(company.editPage());
app.use(company.post());
app.use(company.put());
app.use(company._delete());
app.use(company.get());

app.use(post_type.viewPage());
app.use(post_type.addPage());
app.use(post_type.editPage());
app.use(post_type.post());
app.use(post_type.put());
app.use(post_type._delete());
app.use(post_type.get());

app.use(post.viewPage());
app.use(post.addPage());
app.use(post.editPage());
app.use(post.post());
app.use(post.put());
app.use(post._delete());
app.use(post.get());
app.use(post.insertJsonDataByPostId());
app.use(post.selectJsonDataByPostId());
app.use(post.updatetJsonDataByPostId());
app.use(post.deleteJsonDataByPostId());
app.use(post.addPostLanguagePage());
app.use(post.postLanguage());
app.use(post.editPostLanguagePage());
app.use(post.putLanguage());
app.use(post.selectPostLanguage());
app.use(post.addPageSpecification());
app.use(post.editPageSpecification());
app.use(post.viewPageSpecification());
app.use(post.getSpecification());
app.use(post.help());

app.use(app_key.selectByPublicKey());
app.use(app_key.selectByCompanyId());

app.use(tool.addPage());

app.use(file_writer.createDirectory());

app.use(post_mobile.post_type_mobile());
app.use(post_mobile.selectById());
app.use(post_mobile.selectByParent1());
app.use(post_mobile.selectByParent2());
app.use(post_mobile.selectByParent3());
app.use(post_mobile.selectByParent4());
app.use(post_mobile.selectByParent5());
app.use(post_mobile.search());
app.use(post_mobile.selectByPostType());

app.use(customer.signup());
app.use(customer._delete());
app.use(customer.login());
app.use(customer.verifyEmail());
app.use(customer.uploadPhoto());
app.use(customer.changePassword());
app.use(customer.forgotPassword());
app.use(customer.resendCode());

app.use(wishlist.deleteFromWishlist());
app.use(wishlist.selectByCustomerId());
app.use(wishlist.insert());
app.use(wishlist.selectCart());

app.use(disccount_code._delete());
app.use(disccount_code.post());
app.use(disccount_code.get());
app.use(disccount_code.put());
app.use(disccount_code.addPage());
app.use(disccount_code.viewPage());
app.use(disccount_code.editPage());
app.use(disccount_code.checkCode());

app.use(order.viewPage());
app.use(order.post());
app.use(order.get());
app.use(order.deliver());
app.use(order.refuse());
app.use(order.getLineItems());
app.use(order.ViewLineItemsPage());
app.use(order.selectCustomerOrders());

var multer_2  = require('multer');
var storage_2 = multer_2.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});
var upload_3 = multer_2({ storage: storage_2 }).array("profile-files",12);

app.post('/upload-avatar',function(req,res){
  upload_3(req,res,function(err) {
    if(err) {
      return res.end("Error uploading file.");
    }
    res.end("File is uploaded");
  });
});

var single_upload_2 = multer_2({ storage: storage_2 }).single("profile-file");
app.post('/upload-avatar-single',function(req,res){
  single_upload_2(req,res,function(err) {
    if(err) {
      return res.end("Error uploading file.");
    }
    res.end("File is uploaded");
  });
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const http = require("http");
var server = http.createServer(app);
server.listen(3000);

module.exports = app;
