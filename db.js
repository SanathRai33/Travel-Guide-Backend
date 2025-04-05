require('dotenv').config();
const mongoose = require('mongoose');

const mongoURL = process.env.MONGO_URI;

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB Atlas');
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB Atlas:', error);
  }
};

module.exports = connectToMongo;
