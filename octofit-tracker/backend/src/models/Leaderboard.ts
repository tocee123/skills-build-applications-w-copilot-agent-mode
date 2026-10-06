import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    score: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    rank: {
      type: Number,
      min: 1,
      default: 1,
    },
    challenge: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Leaderboard = model('Leaderboard', leaderboardSchema);

export default Leaderboard;
