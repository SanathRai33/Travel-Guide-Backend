const Test = require('./test')
Test()

const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());

const port = 7002;

app.listen(port, ()=>{
    console.log('----------------------------');
    console.log('Server is running on port'+port);
})


const connectToMongo =require('./db')
connectToMongo()

app.get('/api',(req, res)=>{

    res.send("Success");
    console.log("Jaii")
})


app.use('/api', require('./Router/userRouter.js'))
app.use('/auth', require('./Router/adminRouter.js'))
app.use('/package', require('./Router/packageRouter.js'))
app.use('/hotel', require('./Router/hotelRouter.js'))
app.use('/restaurant', require('./Router/restaurantRouter.js'))
app.use('/booking', require('./Router/bookingRouter.js'))


app.use('/api/uploads', express.static('./uploads'))


const UserSchema = require('./model/user.js')
const user = require('./model/user.js')

const AdminSchema = require('./model/admin.js')
const admin = require('./model/admin.js')

const PackageSchema = require('./model/package.js')
const package = require('./model/package.js')

const HotelSchema = require('./model/hotel.js')
const hotel = require('./model/hotel.js')

const RestaurantSchema = require('./model/restaurant.js')
const restaurant = require('./model/restaurant.js')

const BookingSchema = require('./model/booking.js')
const booking = require('./model/booking.js')

app.post('/insert',async(req,res)=>{
    try{
        const{title, description, price, rating, category, location, duration, image} = req.body

        const Package = new PackageSchema({
            title:title,
            description:description,
            price:price,
            rating:rating,
            category:category,
            location:location,
            duration:duration,
            image:image
        })

        const savepackage = await Package.save()
        res.send(savepackage)

    }catch (error){
        console.log(error)
    }
})

app.post('/insert',async(req,res)=>{
    try{
        const{name, gender, phone, email, password, city, country} = req.body
        const UserData = new UserSchema({
            name:name,
            gender:gender,
            email:email,
            phone:phone,
            password:password,
            city:city,
            country:country,
        })

        const saveuser = await UserData.save()
        res.send(saveuser)

    }catch (error){

        console.log(error)
        
    }
})

app.post('/insert',async(req,res)=>{
    try{
      const { bookBy, transactionIds, title, price, totalPrice, bookedDate, location, numbers, checkIn, checkOut, category} = req.body;
    
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
        checkOut: checkOut
      });
        const savebooking = await booking.save()
        res.send(savebooking)

    }catch (error){
        console.log(error)
    }
})

app.post('/insert',async(req,res)=>{
  try{
      const { name, description, price, rating, reviews, facilities, location  } = req.body;

      const hotel = new HotelSchema({
        name:name,
        description:description,
        price: price,
        image: image,
        singleViewImage: singleViewimage,
        rating: rating,
        reviews: reviews,
        facilities: facilities,
        location: location,
      });

      const savehotel = await Hotel.save()
      res.send(savehotel)

  }catch (error){
      console.log(error)
  }
})

app.post('/insert', async (req, res) => {
    try {
      const { name, cuisine, location, price, rating, reviews, timings, facilities, image, food1, food2, food3 } = req.body;
  
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
  
      const savedRestaurant = await restaurant.save();
      res.send(savedRestaurant);
  
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  });
  



app.get('./get', async(req,res)=>{
    try{
        const data = await AdminSchema.find()
        res.json(data)

    }catch(error){
        console.log(error)

    }
})

app.get('./get', async(req,res)=>{
    try{
        const data = await UserSchema.find()
        res.json(data)

    }catch(error){
        console.log(error)

    }
})

app.get('./get', async(req,res)=>{
    try{
        const data = await RestaurantSchema.find()
        res.json(data)

    }catch(error){
        console.log(error)

    }
})

app.get('./get', async(req,res)=>{
    try{
        const data = await PackageSchema.find()
        res.json(data)

    }catch(error){
        console.log(error)

    }
})

app.get('./get', async(req,res)=>{
    try{
        const data = await HotelSchema.find()
        res.json(data)

    }catch(error){
        console.log(error)

    }
})

app.get('./get', async(req,res)=>{
    try{
        const data = await BookingSchema.find()
        res.json(data)

    }catch(error){
        console.log(error)

    }
})

    

// //   const dealay = Math.floor( Math.random() * 5)
// //   setTimeout(()=>{
// //     res.send(hotels)
// //   }, (dealay * 1000))

// //   console.log(`dealay of ${dealay} seconds`)