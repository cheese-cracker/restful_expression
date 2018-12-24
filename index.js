const express = require('express');
const http = require('http');
const morgan = require('morgan');


const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));

app.use(express.static(__dirname+'/templates'));
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

