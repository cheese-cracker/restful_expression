express = require('express');
body_parser = require('body-parser');

userRouter = express.Router();

userRouter.use(body_parser.json());

userRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        next();
    })
    .get((req, res, next) => {
        res.end('These are the Users!');
    })
    .post((req, res, next) => {
        res.end(`New User ${req.body.name} has been created!`);
    })
    .put((req, res, next) => {
        res.statusCode = 405;
        res.end('Error 405: Method Not Allowed');
    })
    .delete((req, res, next) => {
        res.end('Deleting All Users after auth check!');
    });

userRouter.route('/:userId')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        next();
    })
    .get((req, res, next) => {
        res.end(`This is the account of User-ID: ${req.params.userId}`);
    })
    .post((req, res, next) => {
        res.statusCode = 405;
        res.end(`Error 405: Method Not Allowed`);
    })
    .put((req, res, next) => {
        res.end(`Changed User Details of User-ID ${req.params.userId} to ${req.body.name}`);
    })
    .delete((req, res, next) => {
        res.end(`Deleting user with User-ID ${req.params.userId}`);
    });


module.exports = userRouter;
