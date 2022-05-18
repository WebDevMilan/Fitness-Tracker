const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Number,
        default: () => new Date(),
    },
    exercises: [{
        name: {
            type: String,
            trim: true,
            required: "Exercise Name"
        },

        type: {
            type: String,
            trim: true,
            required: "Exercise Type"
        },
        duration: {
            type: Number,
            required: "Duration (minutes)"
        },
        weight: {
            type: Number
        },

        sets: {
            type: Number
        },
        reps: {
            type: Number
        },
        distance: {
            type: Number
        }

    }],
},
{
    toJSON: {
        virtuals: true
    }
}
);

WorkoutSchema.virtual("totalDuration").get(function () {
    return this.exercises.reduce((total, exercise) => {
        return total + exercise.duration
    }, 0)
})

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout; 