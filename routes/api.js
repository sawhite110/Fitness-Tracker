const db = require("../node_modules");  //const db = require("../models")
const router = require("express").Router();

// Gets or retrieves the workout
router.get("/api/workouts", (req, res)=>{
    db.Workout.find({}).then(dbWorkout =>{
        dbWorkout.forEach(workout=>{
            let total = 0;
            workout.exercises.forEach(e =>{
                total += e.duration;
            });
            workout.totalDuration = total;
        });
        res.json(dbWorkout);
    }).catch(err => {
        res.json(err);
    });
});

// Find one workout and update the workout
router.put("/api/workouts/:id", (req, res) => {
    db.Workout.findOneAndUpdate(
        { _id: req.params.id },
        {
            new: { runValidators: true },
            $push: { exercises: req.body }
        },
        { new: true }).then(dbWorkout => {
            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        });

});

// Creates the workouts
router.post("/api/workouts", ({ body }, res) => {
    db.Workout.create(body).then((dbWorkout=>{
        res.json(dbWorkout);
    })).catch(err => {
        res.json(err);
    });
    
});

// Finds the workouts
router.get("/api/workouts/range",(req, res)=>{
    db.Workout.find({}).then(dbWorkout=>{
        res.json(dbWorkout);
    }).catch(err=>{
        res.json(err);
    });
});

module.exports = router;
