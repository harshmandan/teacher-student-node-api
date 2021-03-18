const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cookie = require('cookie-parser')
const session = require('express-session')
const PORT = 3022;

// Initilization stuff
app.use(express.json({limit: '3mb'}));
app.use(cookie());
app.use(session({
    secret: 'this is my secret session password',
}))
app.use(express.urlencoded({extended: true, limit: '3mb'}));

// EJS engine -> EJS is a template engine ~ handlebars
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//mongoose
mongoose.connect('mongodb://localhost/schoolapp', {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(()=> console.log("DB Connection is successful")).catch((e)=> console.error('DB Connection error', JSON.stringify(e)));

//morgan -> do not use it in production
if(process.env.NODE_ENV!="production") {
    app.use(morgan(':method :url :status :response-time ms'));
}

//router
const router = require('./routes/index');
// const router = require('/routes'); //this also works
app.use(router);

//404 handling
app.use(function(req, res, next) {
    res.status(404).send({code:404, error: 'You seem to be lost'});
})

//start server
app.listen(PORT, ()=> {
    console.log("The app started on the port: "+ PORT);
})

module.exports=app;