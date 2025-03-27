const express = require('express')
const router = express.Router();

const { Insert, UserLogin} = require('../Controller/userController.js');

router.post('/insert', Insert);
router.post('/login', UserLogin)

module.exports = router