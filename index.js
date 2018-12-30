// Main Modules
const express = require('express');
const http = require('http');
const morgan = require('morgan');
// const body_parser = require('body-parser');


// Server Details and Main part
const hostname = 'localhost';
const port = 3000;
const app = express();

// Modules for Express and Static Pages
app.use(morgan('dev'));
app.use(express.static(__dirname+'/templates'));

const houseRouter = require('./routes/houseRouter');
const userRouter = require('./routes/userRouter');
const indexRouter = require('./routes/indexRouter');

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

