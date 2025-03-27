const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    name:{
        type:String,
    },
    gender:{
        type:String
    },
    email:{
        type:String,
    },
    phone:{
        type:String,
    },
    password:{
        type:String
    },
    city:{
        type:String
    },
    country:{
        type:String
    },
    // image:{
    //     type:String
    // },
})

module.exports = mongoose.model("User", UserSchema)