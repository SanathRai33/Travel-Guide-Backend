const express = require('express')
const router = express.Router();
const multer = require('multer');

const { Insert, PackageView, SingleView, Delete, Update, Payment } = require('../Controller/packageController.js');

const storage = multer.diskStorage({
    destination: function (req, file, cb){
    cb(null, './uploads/');
},

filename: function (req, file, cb){
    const uniqueStuffix = Date.now();
    cb(null, uniqueStuffix + '-' + file.originalname);
}
})

const upload = multer({ storage: storage});

router.post('/insert', upload.single('image'), Insert);
router.get('/get', PackageView);
router.get('/SingleView/:id',SingleView)
router.get('/Payment/:id',Payment)
router.delete('/delete/:id', Delete)
router.put('/update/:id', upload.single('image'), Update)

module.exports = router