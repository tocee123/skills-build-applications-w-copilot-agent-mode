import { Schema, model } from 'mongoose';

const activitySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    durationMinutes: {
      type: Number,
      min: 1,
      required: true,
    },
    caloriesBurned: {
      type: Number,
      min: 0,
      default: 0,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Activity = model('Activity', activitySchema);

export default Activity;
