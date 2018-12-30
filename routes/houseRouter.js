const express = require('express');
const body_parser = require('body-parser');

const houseRouter = express.Router();

houseRouter.use(body_parser.json());

// Relative address where house router works ('/houses' will be in index not here')
houseRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        // Content-Type is a param that sets content response, text-html is seperate!
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


houseRouter.route('/:houseId')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        next();
    })
    .get((req, res, next) => {
        res.end(`This is the house of ${req.params.houseId}`)
    })
    .post((req, res, next) => {
        res.statusCode = 405;
        res.end(`Cannot add house ${req.body.name} to an id! Error 405: Method Not Allowed`);
    })
    .put((req, res, next) => {
        res.end(`Changed house with id ${req.params.houseId} to ${req.body.name}`);
    })
    .delete((req, res, next) => {
        res.end(`Deleting house ${req.params.houseId}`);
    });


module.exports = houseRouter;
