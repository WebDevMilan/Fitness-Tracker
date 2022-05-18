const express = require('express');
const router = express.Router();
const Workout = require('../models/workout');

// View workout
router.get('/api/workouts', (req, res) => {
    Workout.find()
        .then(workout_db => {
            res.json(workout_db);
        })
        .catch(err => {
            res.json(err);
        });
});
// Create workout 
router.post('/api/workouts', (req, res) => {
    Workout.create({})
        .then(workout_db => {
            res.json(workout_db);
        })
        .catch(err => {
            res.json(err);
        });
})

// Add exercises to a previous workout plan

router.put('/api/workouts/:id', ({ body, params }, res) => {
    Workout.findByIdAndUpdate(params.id, { $push: { exercises: body } }, { new: true, runValidators: true })
        .then(workout_db => {
            res.json(workout_db);
        })
        .catch(err => {
            res.json(err);
        });
})

router.get('/api/workouts/range', (req, res) => {
    Workout.find({}).limit(5)
        .then(workout_db => {
            res.json(workout_db);
        })
        .catch(err => {
            res.json(err);
        });

})

router.delete('/api/workouts', ({ body }, res) => {
    Workout.findByIdAndDelete(body.id)
        .then(() => {
            res.json(true);
        })
        .catch(err => {
            res.json(err);
        });
})


module.exports = router;