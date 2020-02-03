const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// create geolocation Schema
const GeoSchema = new Schema({
    type: {
        type: String,
        default: 'Point'
    },
    coordinates: {
        type: [Number],
        index: '2dsphere'
    }
}); 
// create ninja Schema & model
const hotelSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    star: {
        type: String
    },
    available: {
        type: Boolean,
        default: false
    },
    geometry: GeoSchema
});
const Hotel = mongoose.model('hotel', hotelSchema);
module.exports = Hotel;