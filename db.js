const mongoose = require('mongoose')
//if the output is unsuccessful (remove the local host and paste this 127.0.0.1)
const mongoURL ="mongodb://localhost:27017/TravelGuide"
//try and catch are exception handling
//Await is a promise (passer) to get output
//mongodb connecting 
const connectToMongo = async () =>{
    try{

        await mongoose.connect(mongoURL)
        console.log('----------------------------');
        console.log("Connect to mongo successful.");
        console.log('----------------------------');
       

    } catch(error){
        console.log("Connect to mongo unsuccessful",error);

    }
}

module.exports = connectToMongo;