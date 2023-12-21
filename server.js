const express = require("express"),
      dotenv =  require("dotenv").config(),
      morgan = require('morgan'),
      bodyparser = require("body-parser"),
      methodOverride = require('method-override'),
      session = require('express-session'),
      cookieParser = require("cookie-parser"),
      flash = require('connect-flash')
      
const connectDB = require('./Data/connection')

const app = express();
const port = process.env.PORT || 5000;

// mongodb connection   
connectDB()

app.use(methodOverride("_method"));
app.use(cookieParser())
app.use(session({
    secret:'flashblog',
    saveUninitialized: true,
    resave: true
}));
app.use(flash())

//log requests
app.use(morgan('tiny'));

// parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json());

//Static Files
app.use(express.static('public'))
app.use("/css",express.static(__dirname+'public/css'))
app.use("/img",express.static(__dirname+'public/img'))
app.use("/js",express.static(__dirname+'public/js'))
app.use("/scss",express.static(__dirname+'public/scss'))
app.use("/vendor",express.static(__dirname+'public/vendor'))


//Templating Engine EJS
app.set('views','./views')
app.set('view engine','ejs')


app.use("/",require("./Route/mainRoute"))
app.use('/',require("./Route/User/userRoute"))


app.listen(port,() => { console.log(`Server is running on port ${port} `) })

//npm run dev