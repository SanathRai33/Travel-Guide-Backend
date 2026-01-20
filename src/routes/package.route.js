const express = require('express');
const router = express.Router();
const { getAllPackages } = require('../controllers/package.controller.js')

router.get('/get', getAllPackages)

module.exports = router