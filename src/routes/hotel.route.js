const express = require('express');
const router = express.Router();
const { getAllHotels } = require('../controllers/hotel.controller.js')

router.get('/', getAllHotels)

module.exports = router