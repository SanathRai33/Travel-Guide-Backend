require('dotenv').config();
const mongoose = require('mongoose');

const mongoURL = process.env.MONGO_URL;

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB Atlas');
    console.log('Project: TripHarbor', 'Database:', mongoose.connection.name);
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB Atlas:', error);
  }
};

module.exports = connectToMongo;
