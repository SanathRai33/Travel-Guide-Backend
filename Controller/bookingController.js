const BookingSchema = require("../model/booking");

const Insert = async (req, res) => {
  try {
    const { bookBy, transactionIds, title, price, time, totalPrice, bookedDate, location, numbers, checkIn, checkOut, category} = req.body;

    const booking = new BookingSchema({
      bookBy: bookBy,
      transactionIds: transactionIds,
      title:title,
      category: category,
      location: location,
      price: price,
      numbers: numbers,
      totalPrice: totalPrice,
      bookedDate: bookedDate,
      checkIn: checkIn,
      checkOut: checkOut,
      time : time,
    });

    const savebooking = await booking.save();
    res.send(savebooking);
  } catch (error) {
    console.log(error);
  }
};

const BookingView = async (req, res) => {
    try {
      const data = await BookingSchema.find();
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  };
  
  
module.exports = { Insert,  BookingView, };

//   const SingleView = async (req, res) => {
//     try {
//       let booking = await BookingSchema.findById(req.params.id);
//       if (!booking) {
//         res.json({
//           Success: false,
//           message: "BookBookPackage not found with this ID!",
//         });
//       } else {
//         res.json({
//           Success: true,
//           message: "BookBookPackage details fetched Successfully",
//           data: booking,
//         });
//       }
//     } catch (error) {
//       console.log("Error");
//     }
//   };

//   const Payment = async (req, res) => {
//     try {
//       let booking = await BookingSchema.findById(req.params.id);
//       if (!booking) {
//         res.json({
//           Success: false,
//           message: "BookBookPackage not found with this ID!",
//         });
//       } else {
//         res.json({
//           Success: true,
//           message: "BookBookPackage details fetched Successfully",
//           data: booking,
//         });
//       }
//     } catch (error) {
//       console.log("Error");
//     }
//   };

//   const Delete = async (req, res) => {
//     try {
//       const id = req.params.id;
//       let data = await BookingSchema.findById(id);
  
//       if (!data) {
//         console.log("Data not found with this ID");
//         return res.status(404).send("Data does not exists with this Id");
//       } else {
//         data = await BookingSchema.findByIdAndDelete(req.params.id);
  
//         res.json({ Success: true, "Deleted Data": data });
//       }
//     } catch (error) {
//       console.log(error);
//       res.status(500).json("Some internal error!!!");
//     }
//   };

//   const Update = async (req, res) => {
//     try {
//       const { title, description, price, rating, category, duration, location  } = req.body;
//       const id = req.params.id;
//       const newData = {};
  
//       if (title) newData.title = title;
//       if (description) newData.description = description;
//       if (price) newData.price = price;
//       if (rating) newData.rating = rating;
//       if (category) newData.category = category;
//       if (duration) newData.duration = duration;
//       if (location) newData.location = location;
  
//       if (req.file) {
//         if (BookingSchema.image) {
//           const oldImagePath = path.join(__dirname, '../uploads', BookingSchema.image);
//           if (fs.existsSync(oldImagePath)) {
//             fs.unlinkSync(oldImagePath); // Delete old image
//           }
//         }
//         newData.image = req.file.filename; // Store new image
//       }
  
//       let data = await BookingSchema.findById(req.params.id);
//       if (!data) {
//         res.json({
//           success: false,
//           message: "BookBookPackage not found with this ID!",
//         });
//       }else{
//         data = await BookingSchema.findByIdAndUpdate(req.params.id,{$set:newData})
//           return res.json({data})
//       }
//     } catch (error) {
//       console.log("Some error occured"+ error);
//       return res.status(500).json("Some internal error!!!");
//     }
//   };
