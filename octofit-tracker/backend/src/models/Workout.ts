import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    durationMinutes: {
      type: Number,
      min: 1,
      required: true,
    },
    exercises: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Workout = model('Workout', workoutSchema);

export default Workout;
