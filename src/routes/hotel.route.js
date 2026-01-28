const express = require('express');
const router = express.Router();
const { getAllHotels, getHotelById } = require('../controllers/hotel.controller.js')

router.get('/', getAllHotels)
router.get('/:id', getHotelById)

module.exports = router