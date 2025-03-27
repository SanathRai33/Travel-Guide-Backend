const express = require("express");
const router = express.Router();
const multer = require("multer");

const { Insert, RestaurantView, SingleView, Delete, Update, Payment } = require("../Controller/restaurantController.js");

// Multer Storage Setup for Image Uploads
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

// Routes
router.post("/insert", upload.single("image"), Insert); 
router.get("/get", RestaurantView); // Get All Restaurants
router.get("/SingleView/:id", SingleView); // Get Single Restaurant
router.delete("/delete/:id", Delete); // Delete Restaurant
router.put("/update/:id", upload.single("image"), Update); // Update Restaurant
router.get("/Payment/:id", Payment);


module.exports = router;
