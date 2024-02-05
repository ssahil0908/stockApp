const mongoose = require('mongoose');
const dotenv=require("dotenv");

dotenv.config();
mongoose.connect(process.env.Mongo_URL);

const db = mongoose.connection;

db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
  });
  
db.once('open', () => {
    console.log('Connected to MongoDB');
  });

module.exports = mongoose;
