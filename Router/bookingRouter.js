const express = require('express');
const multer = require('multer');
const router = express.Router();
const upload = multer(); // Use multer to parse FormData

const { Insert, BookingView } = require('../Controller/bookingController.js');

// Use upload.none() for FormData without files
router.post('/insert', upload.none(), Insert);
router.get('/get', BookingView);

module.exports = router;