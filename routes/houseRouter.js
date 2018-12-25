const express = require('express');
const body_parser = require('body-parser');

const houseRouter = express.Router();

houseRouter.use(body_parser.json());

// Relative address where house router works ('/houses' will be in index not here')
houseRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        next();
    })
    .get((req, res, next) => {
        res.end('These are the available houses!');
    })
    .post((req, res, next) => {
        res.end(`The house ${req.body.name} is successfully put for rent!`);
    })
    .put((req, res, next) => {
        res.statusCode = 405;
        res.end('Cannot change house details use house/<id> address instead! Error 405: Method Not Allowed');
    })
    .delete((req, res, next) => {
        res.end('ALL ENTRIES ARE BEING DELETED!');
    });
// Last line has ';', the Route contains all the methods!


module.exports = houseRouter;

