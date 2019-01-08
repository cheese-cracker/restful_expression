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
            // Error parameter above seems kinda optional
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        Houses.create(req.body)
            .then((created) => {
                res.json(created);
                console.log(`The house ${req.body.name} is successfully put for rent!`);
            })
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
            }).catch((err) => next(err));
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
        console.log(`Error 405: Method Not Allowed! Cannot add house ${req.body.name} to an id!`);
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
    });


// Add Rooms with roomId
houseRouter.route('/:houseId/room/:roomId')
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
                    room = house.rooms.id(req.params.roomId);
                    // room = null;
                    // for(var i = 0; i < house.rooms.length; i++){
                    //     if(req.params.roomId == house.rooms[i]._id){
                    //         room = house.rooms[i];
                    //     }
                    // }
                    if(room != null){
                        res.json(room);
                        console.log(`Room: ${req.params.roomId}`);
                    }else {
                        erR = new Error(`Room ${req.params.roomId} not in house ${req.params.houseId}`);
                        res.statusCode = 404;
                        return next(erR);
                        // return is to pass directly to catch(e)
                    }
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
        res.statusCode = 405;
        res.end(`ERROR 405: POST Method Not Supported! Cannot add room ${req.body.type} to specific id!`);
        console.log('Error 405: POST Method Not Allowed');
    })
    .put((req, res, next) => {
        Houses.findByIdAndUpdate(req.params.houseId).then((haus) => {
            if(haus != null && haus.rooms.id(req.params.roomId) != null){
                room = haus.rooms.id(req.params.roomId);
                // Since Rooms Schema is not made Model and exported, manually updating
                // Note that 'type' cannot be changed (since that would change room itself!
                if(req.body.description != null){
                    room.description = req.body.description;
                }
                if(req.body.area != null){
                    room.area = req.body.area;
                }
                haus.save().then((haus) => {
                    res.json(haus);
                    console.log(`Room ${req.params.roomId} changed in house ${req.params.houseId}!`);
                }).catch((e) => next(e));
            } else if(haus != null){
                erR = new Error(`Room ${req.params.roomId} does not exist in house ${req.params.houseId}!`);
                res.statusCode =  404;
                return next(erR);
            }else {
                erR = new Error(`House ${req.params.houseId} does not exist`);
                res.statusCode = 404;
                return next(erR);
            }
        }).catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Houses.findByIdAndUpdate(req.params.houseId)
            .then((haus) => {
                if (haus != null && haus.rooms.id(req.params.roomId) != null){
                    haus.rooms.id(req.params.roomId).remove();
                    haus.save().then((haus) => {
                        res.json(haus);
                        console.log(`Room ${req.params.roomId} has been deleted from house ${req.params.houseId}!`);
                    }).catch((e) => next(e));
                } else if(haus != null){
                    erR = new Error(`Room ${req.params.roomId} does not exist in house ${req.params.houseId}!`);
                    res.statusCode =  404;
                    return next(erR);
                } else {
                    res.statusCode = 404;
                    erR = new Error(`House ${req.params.houseId} does not exist`);
                    return next(erR);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    });


module.exports = houseRouter;
