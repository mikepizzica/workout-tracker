const router = require("express").Router();
const Workout = require("../models/workoutPlan.js");

// create new workout
router.post("/api/workouts", ({body}, res) => {
    Workout.create(body)
        .then((dbWorkout) => {
            res.json(dbWorkout)
        })
        .catch((err) => {
            res.status(400).res.json(err)
        })
})

// get last workout
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

// add exercise to workout
router.put("/api/workouts/:id", ({ body, params }, res) => {
    Workout.findByIdAndUpdate(
      { _id: params.id },
      { $push: { exercises: body } },
      { new: true }
    )
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.status(400).res.json(err);
      });
  });

// get workout for last 7 days
router.get("/api/workouts/range", (req, res) => {
    Workout.aggregate([{
      $addFields: {
        totalDuration:{$sum: "$exercises.duration"}
      }
    }])
      .sort({_id:1}).limit(7)
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });

module.exports = router