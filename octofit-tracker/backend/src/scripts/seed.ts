import mongoose from 'mongoose';
import User from '../models/User.js';
import Team from '../models/Team.js';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Workout from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Seed the octofit_db database with test data');

    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Leaderboard.deleteMany({});
    await Workout.deleteMany({});

    const users = await User.insertMany([
      {
        username: 'mona',
        email: 'mona@example.com',
        password: 'supersecret',
        age: 28,
        fitnessLevel: 'advanced',
      },
      {
        username: 'ben',
        email: 'ben@example.com',
        password: 'supersecret',
        age: 32,
        fitnessLevel: 'intermediate',
      },
      {
        username: 'sasha',
        email: 'sasha@example.com',
        password: 'supersecret',
        age: 25,
        fitnessLevel: 'beginner',
      },
    ]);

    await Team.insertMany([
      {
        name: 'Power Pioneers',
        city: 'Seattle',
        sport: 'Cardio',
        members: users.map((user) => user._id),
      },
    ]);

    await Activity.insertMany([
      {
        user: users[0]._id,
        type: 'Running',
        durationMinutes: 35,
        caloriesBurned: 420,
        notes: 'Tempo interval run',
      },
      {
        user: users[1]._id,
        type: 'Strength',
        durationMinutes: 40,
        caloriesBurned: 390,
        notes: 'Upper-body focus',
      },
      {
        user: users[2]._id,
        type: 'Cycling',
        durationMinutes: 25,
        caloriesBurned: 310,
        notes: 'Recovery ride',
      },
    ]);

    await Leaderboard.insertMany([
      {
        user: users[0]._id,
        score: 980,
        rank: 1,
        challenge: 'Monthly Sprint Challenge',
      },
      {
        user: users[1]._id,
        score: 870,
        rank: 2,
        challenge: 'Monthly Sprint Challenge',
      },
      {
        user: users[2]._id,
        score: 760,
        rank: 3,
        challenge: 'Monthly Sprint Challenge',
      },
    ]);

    await Workout.insertMany([
      {
        name: 'HIIT Circuit',
        category: 'Cardio',
        difficulty: 'advanced',
        durationMinutes: 30,
        exercises: ['Burpees', 'Jump squats', 'Mountain climbers', 'Plank jacks'],
      },
      {
        name: 'Strength Builder',
        category: 'Resistance',
        difficulty: 'intermediate',
        durationMinutes: 45,
        exercises: ['Deadlifts', 'Push-ups', 'Rows', 'Lunges'],
      },
      {
        name: 'Mobility Flow',
        category: 'Recovery',
        difficulty: 'beginner',
        durationMinutes: 20,
        exercises: ['Hip rotations', 'Hamstring stretch', 'Shoulder rolls'],
      },
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
