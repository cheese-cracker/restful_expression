const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

// See all data types from mongoose docs!
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;


const roomSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    area : {
        type: Number,
        min: 0,
        max: 250,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamp: true
});


const houseSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        default: 'Apartment'
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    cost: {
        type: Currency,
        // required: true,
        min: 0
    },
    featured: {
        type: Boolean,
        default: false
    },
    rooms: [roomSchema]
}, {
    timestamp: true
});


var Houses = model('House', houseSchema);

module.exports = Houses;
