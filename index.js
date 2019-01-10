// Main Modules
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const mongoose = require('mongoose');

// Local Imports
const Houses = require('./models/houses.js');

// Server Details and Main part
const hostname = 'localhost';
const port = 3000;
const app = express();

// MongoDB Connection
const url = 'mongodb://localhost:27017/WareHounds'

mongoose.connect(url, { useNewUrlParser: true })
    .then((db) => {
        console.log('Connected to MongoDB server!');
})
    .catch((err) => { console.log(err); });

// Modules for Express and Static Pages
app.use(morgan('dev'));
app.use(express.static(__dirname+'/templates'));

const houseRouter = require('./routes/houseRouter');
const userRouter = require('./routes/userRouter');
const indexRouter = require('./routes/indexRouter');


// Add basic authentication
function authify (req, res, next){
    console.log(req.headers);
    var authHeader = req.headers.authorization;
    if(!authHeader){
        erR = new Error('Unauthorized Entry: Please Login to authenticate!');
        res.statusCode = 404;
        res.setHeader('WWW-Authenticate', 'Basic');
        console.log('Unauth 1');
        return next(erR);
    }

    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString();
    var userPass = auth.split(':');
    if(userPass[0] === 'admin' && userPass[1] === 'pass'){
        console.log('Authenticated!');
        next();
    }else{
        var erR = new Error('Incorrect Authentication: Login with appropriate username and password!');
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic');
        console.log('Unauth 2');
        return next(erR);
    }
}


app.use(authify);

app.use('/house', houseRouter);
app.use('/user', userRouter);
app.use('/index', indexRouter);

// next is for middleware
app.use((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1> Express Server says "ERROR"!</h1>');
});


// Since Express Server
const serv = http.createServer(app);

serv.listen(port, hostname, () => {
    console.log(`This server has started at http://${hostname}:${port}`);
});

