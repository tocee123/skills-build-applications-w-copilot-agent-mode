import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

export async function connectDatabase() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  return mongoose.connect(connectionString);
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

export default db;
