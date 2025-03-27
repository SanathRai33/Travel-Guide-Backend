const mongoose = require('mongoose');
const {Schema} = mongoose; 

const HotelSchema = new Schema({
    name:{
        type:String,
    },
    description:{
        type:String
    },
    price:{
        type:String,
    },
    outsideImage:{
        type:String,
    },
    insideImage:{
        type: String
    },
    rating:{
        type:String
    },
    reviews:{
        type:String
    },
    location:{
        type:String
    },
    facilities:{
        type:String
    }
})

module.exports = mongoose.model("Hotel", HotelSchema)