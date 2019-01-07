const express = require('express');
const body_parser = require('body-parser');
const mongoose = require('mongoose');

const houseRouter = express.Router();
const Houses = require('../models/houses');

houseRouter.use(body_parser.json());

// Relative address where house router works ('/houses' will be in index not here')
houseRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        // Content-Type is a param that sets content response, text-html is seperate!
        next();
    })
    .get((req, res, next) => {
        Houses.find({})
            .then((results) => {
                res.json(results);
                console.log('These are the available houses!');
                // js array object as res
            }, (err) => next(err))
            .catch((err) => next(err));
        // Letting error pass this time
    })
    .post((req, res, next) => {
        Houses.create(req.body)
            .then((created) => {
                res.json(created);
                console.log(`The house ${req.body.name} is successfully put for rent!`);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 405;
        res.end('Error 405: PUT Method Not Supported! House should be specified');
        console.log('Error 405: PUT Method Not Allowed');
    })
    .delete((req, res, next) => {
        Houses.remove({})
            .then((rres) => {
                res.json(rres);
            }, (err) => next(err))
            .catch((err) => next(err));
        console.log('ALL ENTRIES ARE BEING DELETED!');
    });
// Last line has ';', the Route contains all the methods!


houseRouter.route('/:houseId')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        next();
    })
    .get((req, res, next) => {
        Houses.findById(req.params.houseId)
            .then((house) => {
                res.json(house);
            }, (err) => next(err))
            .catch((err)=> next(err));
        console.log(`This is the house of ${req.params.houseId}`);
    })
    .post((req, res, next) => {
        res.statusCode = 405;
        res.end('Error 405: POST Method Not Supported');
        console.log(`Cannot add house ${req.body.name} to an id! Error 405: Method Not Allowed`);
    })
    .put((req, res, next) => {
        Houses.findByIdAndUpdate(req.params.houseId, {
            $set: req.body
        }, { new: true })
            .then((upHouse) => {
                res.json(upHouse);
            }, (err) => next(err))
            .catch((err) => next(err));
        console.log(`Changed house with id ${req.params.houseId} to ${req.body.name}`);
    })
    .delete((req, res, next) => {
        Houses.findByIdAndRemove(req.params.houseId)
            .then((rres) => {
                res.json(rres);
            }, (err) => next(err))
            .catch((err) => next(err));
        console.log(`Deleting house ${req.params.houseId}`);
    });


// Add Room routes too!
houseRouter.route('/:houseId/room/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        // Content-Type is a param that sets content response, text-html is seperate!
        next();
    })
    .get((req, res, next) => {
        Houses.findById(req.params.houseId)
            .then((house) => {
                if(house != null){
                    res.json(house.rooms);
                    console.log('These are the available rooms!');
                }else{
                    erR = new Error(`House ${req.params.houseId} does not exist`);
                    res.statusCode = 404;
                    return next(erR);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
        // Letting error pass this time
    })
    .post((req, res, next) => {
        Houses.findByIdAndUpdate(req.params.houseId)
            .then((house) => {
                if(house != null){
                    house.rooms.push(req.body)
                    house.save().then((house) =>{
                        res.json(house);
                        console.log(`The room ${req.body.name} added successfully to house ${req.params.houseId}!`);
                    }).catch((err) => next(err))
                }else{
                    erR = new Error(`House ${req.params.houseId} does not exist`);
                    res.statusCode = 404;
                    return next(erR);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 405;
        res.end('Error 405: PUT Method Not Supported! Room must be specified!');
        console.log('Error 405: PUT Method Not Allowed');
    })
    .delete((req, res, next) => {
        Houses.findByIdAndUpdate(req.params.houseId)
            .then((haus) => {
                if (haus != null){
                    haus.rooms = [];
                    haus.save().then((haus) => {
                        res.json(haus);
                        console.log(`All rooms of house ${req.params.houseId} are deleted!`);
                    }).catch((e) => next(e));
                } else {
                    res.statusCode = 404;
                    erR = new Error(`House ${req.params.houseId} does not exist`);
                    return next(erR);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
        console.log('ALL ENTRIES ARE BEING DELETED!');
    });




module.exports = houseRouter;
