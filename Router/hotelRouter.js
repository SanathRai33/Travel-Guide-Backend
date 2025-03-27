const express = require("express");
const router = express.Router();
const multer = require("multer");

const { Insert, HotelView, SingleView, Delete, Update, Payment } = require("../Controller/hotelController.js");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage });

router.post("/insert", upload.fields([{ name: "outsideImage" }, { name: "insideImage" }]), Insert);
router.get("/get", HotelView);
router.get("/SingleView/:id", SingleView);
router.get("/Payment/:id", Payment);
router.delete("/delete/:id", Delete);
router.put("/update/:id", upload.fields([{ name: "outsideImage" }, { name: "insideImage" }]), Update);

module.exports = router;
