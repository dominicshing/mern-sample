const mongoose = require('mongoose');
const Workout = require('../models/Workout');

// get all workouts

const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });

  res.status(200).json(workouts);
};

// get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  // Check if ObjectId is valid (shoud be a 12 byte string)
  if (mongoose.Types.ObjectId.isValid(id)) {
    const workout = await Workout.findById(id);

    if (!workout) {
      return res.status(404).json({ error: `No such workout` });
    }

    res.status(200).json(workout);
  } else {
    return res.status(404).json({ error: `No such workout` });
  }
};

// create new workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push('title');
  }

  if (!reps) {
    emptyFields.push('reps');
  }

  if (!load) {
    emptyFields.push('load');
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill in all fields', emptyFields });
  }

  try {
    const workout = await Workout.create({ title, reps, load });
    res.status(201).json(workout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (mongoose.Types.ObjectId.isValid(id)) {
    const oldWorkout = await Workout.findByIdAndUpdate(id, { ...req.body });

    if (!oldWorkout) {
      return res.status(404).json({ error: `Update failed` });
    }

    const updatedWorkout = await Workout.findById(id);

    res.status(200).json(updatedWorkout);
  } else {
    return res.status(404).json({ error: `No such workout` });
  }
};

// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (mongoose.Types.ObjectId.isValid(id)) {
    const workout = await Workout.findByIdAndDelete(id);

    if (!workout) {
      return res.status(404).json({ error: `No such workout` });
    }

    res.status(200).json(workout);
  } else {
    return res.status(400).json({ error: `No such workout` });
  }
};

module.exports = {
  getWorkout,
  getWorkouts,
  createWorkout,
  updateWorkout,
  deleteWorkout,
};
