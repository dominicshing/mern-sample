const router = require('express').Router();
const Workout = require('../models/Workout');


// GET all workouts
router.get('/', (req, res) => {
    res.status(200).json({msg:`GET all workouts`});
})

// GET a single workout
router.get('/:id', (req, res) => {
    res.status(200).json({id: req.params.id, msg:`GET a single workouts`});
})

// POST a new workout
router.post('/', async (req, res) => {
    const {title, reps, load} = req.body;

    try{
        const workout = await Workout.create({title, reps, load});
        res.status(201).json({msg:`POST a new workout`, data: workout});
    }catch(err){
        res.status(400).json({err: err.message})
    }

    
})

// UPDATE a workout
router.patch('/:id', (req, res) => {
    res.status(200).json({id: req.params.id, msg:`UPDATE a workout`, data: req.body});
    
})

// DELETE a workout
router.delete('/:id', (req, res) => {
    res.status(200).json({id: req.params.id, msg:`Delete a workout`});
})


module.exports = router;