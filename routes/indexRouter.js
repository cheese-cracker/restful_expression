express = require('express');

indexRouter = express.Router();

indexRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','text/html');
        next();
    })
    .get((req, res, next) => {
        res.end('<h1> THIS IS THE INDEX PAGE!</h1>');
    })
    .post((req, res, next) => {
        res.end('<h2> Info has been posted to Index page </h2>');
    })
    .put((req, res, next) => {
        res.statusCode = 405;
        res.end('<h2> Sorry, This method is not supported for Index page </h2>');
    })
    .delete((req, res, next) => {
        res.statusCode = 405;
        res.end('<h2> Sorry, This method is not supported for Index page </h2>');
    });

module.exports = indexRouter;
