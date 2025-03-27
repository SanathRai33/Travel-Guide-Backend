const HotelSchema = require("../model/hotel");
const path = require("path");
const fs = require("fs");

const Insert = async (req, res) => {
  try {
    const { name, description, price, rating, reviews, facilities, location } = req.body;

    const outsideImage = req.files.outsideImage[0].filename;
    const insideImage = req.files.insideImage[0].filename;

    const hotel = new HotelSchema({
      name: name,
      description:description,
      price:price,
      outsideImage:outsideImage,
      insideImage:insideImage, 
      rating:rating,
      reviews:reviews,
      facilities:facilities,
      location:location,
    });

    const savehotel = await hotel.save();
    res.send(savehotel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const HotelView = async (req, res) => {
  try {
    const data = await HotelSchema.find();
    res.json(data);
  } catch (error) {
    console.error(error);
  }
};

const SingleView = async (req, res) => {
  try {
    let hotel = await HotelSchema.findById(req.params.id);
    if (!hotel) {
      res.json({ success: false, message: "Hotel not found with this ID!" });
    } else {
      res.json({ success: true, message: "Hotel details fetched successfully", data: hotel });
    }
  } catch (error) {
    console.error(error);
  }
};


const Payment = async (req, res) => {
  try {
    let hotel = await HotelSchema.findById(req.params.id);
    if (!hotel) {
      res.json({ success: false, message: "Hotel not found with this ID!" });
    } else {
      res.json({ success: true, message: "Hotel details fetched successfully", data: hotel });
    }
  } catch (error) {
    console.error(error);
  }
};

const Delete = async (req, res) => {
  try {
    const id = req.params.id;
    let data = await HotelSchema.findById(id);

    if (!data) {
      console.log("Data not found with this ID");
      return res.status(404).send("Data does not exist with this ID");
    } else {
      data = await HotelSchema.findByIdAndDelete(req.params.id);
      res.json({ success: true, "Deleted Data": data });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Some internal error!");
  }
};

const Update = async (req, res) => {
  try {
    const { name, description, price, rating, reviews, facilities, location } = req.body;
    const id = req.params.id;
    const newData = {};

    if (name) newData.name = name;
    if (description) newData.description = description;
    if (price) newData.price = price;
    if (rating) newData.rating = rating;
    if (reviews) newData.reviews = reviews;
    if (facilities) newData.facilities = facilities;
    if (location) newData.location = location;

    if (req.files && req.files.outsideImage) {
      if (HotelSchema.outsideImage) {
        const oldImagePath = path.join(__dirname, "../uploads", HotelSchema.outsideImage);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      newData.outsideImage = req.files.outsideImage[0].filename;
    }

    if (req.files && req.files.insideImage) {
      if (HotelSchema.insideImage) {
        const oldImagePath = path.join(__dirname, "../uploads", HotelSchema.insideImage);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      newData.insideImage = req.files.insideImage[0].filename;
    }

    let data = await HotelSchema.findById(req.params.id);
    if (!data) {
      res.json({ success: false, message: "Hotel not found with this ID!" });
    } else {
      data = await HotelSchema.findByIdAndUpdate(req.params.id, { $set: newData });
      return res.json({ data });
    }
  } catch (error) {
    console.error("Some error occurred: " + error);
    return res.status(500).json("Some internal error!");
  }
};

module.exports = { Insert, HotelView, SingleView, Delete, Update, Payment };
