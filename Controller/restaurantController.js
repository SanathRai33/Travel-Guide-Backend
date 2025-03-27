const RestaurantSchema = require("../model/restaurant");

const Insert = async (req, res) => {
  try {
    const {
      name,
      cuisine,
      location,
      price,
      rating,
      reviews,
      timings,
      facilities,
      food1,
      food2,
      food3,
    } = req.body;
    const image = req.file.filename;

    const restaurant = new RestaurantSchema({
      name: name,
      cuisine: cuisine,
      location: location,
      price: price,
      rating: rating,
      reviews: reviews,
      timings: timings,
      facilities: facilities,
      image: image,
      food1: food1,
      food2: food2,
      food3: food3,
    });

    const saveRestaurant = await restaurant.save();
    res.send(saveRestaurant);
  } catch (error) {
    console.error("Error inserting restaurant:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const RestaurantView = async (req, res) => {
  try {
    const data = await RestaurantSchema.find();
    res.json(data);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const SingleView = async (req, res) => {
  try {
    const restaurant = await RestaurantSchema.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found with this ID!",
      });
    }
    res.json({
      success: true,
      message: "Restaurant details fetched successfully",
      data: restaurant,
    });
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


  const Delete = async (req, res) => {
    try {
      const id = req.params.id;
      let data = await RestaurantSchema.findById(id);
  
      if (!data) {
        console.log("Data not found with this ID");
        return res.status(404).send("Data does not exists with this Id");
      } else {
        data = await RestaurantSchema.findByIdAndDelete(req.params.id);
  
        res.json({ Success: true, "Deleted Data": data });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json("Some internal error!!!");
    }
  };


  const Payment = async (req, res) => {
    try {
      let restaurant = await RestaurantSchema.findById(req.params.id);
      if (!restaurant) {
        res.json({
          Success: false,
          message: "Restaurant not found with this ID!",
        });
      } else {
        res.json({
          Success: true,
          message: "restaurant details fetched Successfully",
          data: restaurant,
        });
      }
    } catch (error) {
      console.log("Error");
    }
  };

const Update = async (req, res) => {
  try {
    const {
      name,
      cuisine,
      location,
      price,
      rating,
      reviews,
      timings,
      facilities,
      food1,
      food2,
      food3,
    } = req.body;
    const id = req.params.id;
    const newData = {};

    if (name) newData.name = name;
    if (cuisine) newData.cuisine = cuisine;
    if (location) newData.location = location;
    if (price) newData.price = price;
    if (rating) newData.rating = rating;
    if (reviews) newData.reviews = reviews;
    if (timings) newData.timings = timings;
    if (facilities) newData.facilities = facilities;
    if (food1) newData.food1 = food1;
    if (food2) newData.food2 = food2;
    if (food3) newData.food3 = food3;

    if (req.file) {
      if (RestaurantSchema.image) {
        const oldImagePath = path.join(
          __dirname,
          "../uploads",
          restaurant.image
        );
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      newData.image = req.file.filename; 
    }

    let data = await RestaurantSchema.findById(id);
    if (!data) {
      return res.json({
        success: false,
        message: "Restaurant not found with this ID!",
      });
    } else {
      data = await RestaurantSchema.findByIdAndUpdate(req.params.id, {
        $set: newData,
      });
      return res.json({ data });
    }
  } catch (error) {
    console.error("Some error occurred: " + error);
    return res
      .status(500)
      .json({ success: false, message: "Some internal error!!!" });
  }
};

module.exports = { Insert, RestaurantView, SingleView, Delete, Update, Payment };
