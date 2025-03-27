const PackageSchema = require("../model/package");

const Insert = async (req, res) => {
  try {
    const { title, description, price, rating, category, duration, location  } = req.body;
    const image = req.file.filename

    const package = new PackageSchema({
      title:title,
      description:description,
      price: price,
      image: image,
      rating: rating,
      category: category,
      duration: duration,
      location: location,
    });

    const savepackage = await package.save();

    res.send(savepackage);
  } catch (error) {
    console.log(error);
  }
};

const PackageView = async (req, res) => {
    try {
      const data = await PackageSchema.find();
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  };

  const SingleView = async (req, res) => {
    try {
      let package = await PackageSchema.findById(req.params.id);
      if (!package) {
        res.json({
          Success: false,
          message: "Package not found with this ID!",
        });
      } else {
        res.json({
          Success: true,
          message: "Package details fetched Successfully",
          data: package,
        });
      }
    } catch (error) {
      console.log("Error");
    }
  };

  const Payment = async (req, res) => {
    try {
      let package = await PackageSchema.findById(req.params.id);
      if (!package) {
        res.json({
          Success: false,
          message: "Package not found with this ID!",
        });
      } else {
        res.json({
          Success: true,
          message: "Package details fetched Successfully",
          data: package,
        });
      }
    } catch (error) {
      console.log("Error");
    }
  };

  const Delete = async (req, res) => {
    try {
      const id = req.params.id;
      let data = await PackageSchema.findById(id);
  
      if (!data) {
        console.log("Data not found with this ID");
        return res.status(404).send("Data does not exists with this Id");
      } else {
        data = await PackageSchema.findByIdAndDelete(req.params.id);
  
        res.json({ Success: true, "Deleted Data": data });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json("Some internal error!!!");
    }
  };

  const Update = async (req, res) => {
    try {
      const { title, description, price, rating, category, duration, location  } = req.body;
      const id = req.params.id;
      const newData = {};
  
      if (title) newData.title = title;
      if (description) newData.description = description;
      if (price) newData.price = price;
      if (rating) newData.rating = rating;
      if (category) newData.category = category;
      if (duration) newData.duration = duration;
      if (location) newData.location = location;
  
      if (req.file) {
        if (PackageSchema.image) {
          const oldImagePath = path.join(__dirname, '../uploads', PackageSchema.image);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath); // Delete old image
          }
        }
        newData.image = req.file.filename; // Store new image
      }
  
      let data = await PackageSchema.findById(req.params.id);
      if (!data) {
        res.json({
          success: false,
          message: "Package not found with this ID!",
        });
      }else{
        data = await PackageSchema.findByIdAndUpdate(req.params.id,{$set:newData})
          return res.json({data})
      }
    } catch (error) {
      console.log("Some error occured"+ error);
      return res.status(500).json("Some internal error!!!");
    }
  };

module.exports = { Insert, PackageView, SingleView, Delete, Update, Payment };