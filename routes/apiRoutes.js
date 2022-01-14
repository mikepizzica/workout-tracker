const router = require("express").Router();
const Workout = require("../models/workoutPlan.js");

// create routes for api.js
// look at directions use aggregates

router.post("/api/workouts", ({body}, res) => {
    Workout.create(body)
        .then((dbWorkout) => {
            res.json(dbWorkout)
        })
        .catch((err) => {
            res.status(400).res.json(err)
        })
})

router.get("/api/workouts", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: '$exercises.duration'
                },
            },
        },
    ])
        .then((dbWorkout) => {
            res.json(dbWorkout)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
});

router.put("/api/workouts/:id", ({body, params}, res) => {
    Workout.findByIdAndUpdate(
        {_id: params.id},
        {$push: {exercises: body}},
        {new: true}
    )
        .then((dbWorkout) => {
            res.json(dbWorkout)
        })
        .catch((err) => {
            res.status(400).res.json(err)
        })
});

router.get("/api/workouts/range", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration:
                    {$sum: 'exercises.duration'},
                totalWeight:
                    {$sum: '$exercises.weight'}
            }
        }
    ])
        .limit(10)
        .then((dbWorkout) => {
            res.json(dbWorkout)
        })
        .catch((err) => {
            res.json(err)
        })
});

module.exports = router