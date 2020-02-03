const express = require('express');
const router = express.Router();
const Hotel = require('../model/hotel');

router.get('/hotelz', function(req, res, next){
    
    // TO GET ALL HOTELS
    /*Hotel.find({}).then(function(hotel){
        res.send(hotel);
    }); */
    
    Hotel.aggregate([{
        $geoNear: {
          near: {
            'type': 'Point',
            'coordinates': [parseFloat(req.query.lng), parseFloat(req.query.lat)]
          },
          distanceField: "dist.calculated",
          maxDistance: 100000,
          spherical: true
        }
      }]).then((hotels) => {
        res.send(hotels);
      });
});


// Add a new hotel to the db
router.post('/hotelz', function(req, res, next){
    Hotel.create(req.body).then(function(hotel){
        res.send(hotel);
    }).catch(next);
});


// Update a hotel
router.put('/hotelz/:id', function(req,res,next) {
  Hotel.findByIdAndUpdate({_id : req.params.id}).then( function(hotel) {
    res.send(hotel);
  }).catch(next);
});

// Delete a hotel
router.delete('/hotelz/:id', function(req,res,next) {
  Hotel.findByIdAndRemove({_id : req.params.id}).then( function(hotel) {
    res.send(hotel);
  }).catch(next);
});

module.exports = router;
