let createError = require('http-errors'), express = require('express'), path = require('path'),
    cookieParser = require('cookie-parser'), logger = require('morgan'), bodyParser = require('body-parser'),dotenv = require('dotenv').config()
    ,mongoose=require("mongoose"),categories=require("./models/category")


let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/*app.locals={
    appColor:conf.app_color
}*/
let unless = function(middleware, ...paths) {
    return function(req, res, next) {
        const pathCheck = paths.some(path => path === req.path);
        pathCheck ? next() : middleware(req, res, next);
    };
};


mongoose.connect(`mongodb://${process.env.DB_ADDRESS}:${process.env.DB_PORT}/Shop`,{useNewUrlParser:true,useUnifiedTopology: true}).then(db =>{

    console.log('MONGO connected');

}).catch(error=> console.log(error));


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser("FuckASP"));
app.use(express.static(path.join(__dirname, 'public')));


//Assigning Path To Express
let indexRouter = require('./routes/index')(express);
let authRouter = require('./routes/auth')(express);
let adminRouter = require('./routes/admin')(express);
let userRouter = require('./routes/user')(express);

//Authenticate check Middleware
app.use((req, res, next) => {
    //Code For Authenticate
    next()
})


//Private Route
//app.use("admin",...);

/*app.use(unless((req, res, next) => {
    /!*categories.find().then(CategoriesForHeader=>req.locals = {categories:CategoriesForHeader})*!/
    next()
},'/administrator', "/api"))*/
app.use((req,res,next)=>{
    let notifs=[{title:"slm",text:"این یک متن پیام ناتیفیکیشن میباشد",type:"danger"},{title:"بروز رسانی سرور ها",text:"این یک متن پیام ناتیفیکیشن میباشد",type:"default"}];
    let user;/*TODO:User Authenticating*/
    res.locals={
        req:req.url,
        notifications:notifs,
        user:user
    }

    next()
})


//Public Route
app.use((req, res, next) => {
    global.categories = ["test", "test1", "test2"];
    next();
})
app.use('/', indexRouter);
app.use('/administrator', adminRouter);
app.use('/user', userRouter);
app.use(authRouter);


/*app.route("/test").get((req, res) => {
    res.send("test Get")
}).post((req, res) => {
    res.send("test POST")
}).put((req, res) => {
    res.send("test PUT")
}).patch((req,res)=>{
    res.send("test PATCH")
})*/

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;