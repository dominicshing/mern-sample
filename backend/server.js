require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');
const cors = require('cors');

// express app
const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  // log out method and path for every request
  console.log(req.method, req.path);
  next();
});

// routes
app.use('/api/workouts', workoutRoutes);

// connect to MongoDB
const connectToMongoDB = async () => {
  mongoose.set('strictQuery', true);

  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`connected to mongodb`);
  } catch (err) {
    console.log(err);
  }
};

connectToMongoDB();

// listen for requests
app.listen(process.env.PORT, () => {
  console.log(`listening on port `, process.env.PORT);
});
