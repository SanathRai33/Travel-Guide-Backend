const mongoose = require('mongoose');
const {Schema} = mongoose; 

const PackageSchema = new Schema({
    title:{
        type:String,
    },
    description:{
        type:String
    },
    price:{
        type:String,
    },
    image:{
        type:String,
    },
    rating:{
        type:String
    },
    category:{
        type:String
    },
    location:{
        type:String
    },
    duration:{
        type:String
    }
})

module.exports = mongoose.model("Package", PackageSchema)