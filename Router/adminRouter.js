const express = require('express')
const router = express.Router();

const { Insert, AdminLogin, AdminView, Delete} = require('../Controller/adminController.js');

router.post('/insert', Insert);
router.post('/login', AdminLogin)
router.get('/get', AdminView);
router.delete('/delete/:id', Delete)

module.exports = router