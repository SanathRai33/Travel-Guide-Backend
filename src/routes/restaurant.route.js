const express = require('express');
const router = express.Router();
const { getAllRestaurants, getRestaurantById } = require('../controllers/restaurant.controller.js')

router.get('/', getAllRestaurants)
router.get('/:id', getRestaurantById)

module.exports = router