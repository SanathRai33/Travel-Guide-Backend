const express = require('express');
const router = express.Router();
const { getAllHotels, getHotelById } = require('../controllers/hotel.controller.js')
const { getAllRestaurants } = require('../controllers/restaurant.controller.js')

router.get('/', getAllHotels)
router.get('/resto', getAllRestaurants)
router.get('/:id', getHotelById)


module.exports = router