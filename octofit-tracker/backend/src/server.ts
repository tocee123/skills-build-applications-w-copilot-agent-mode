import express from 'express';
import { type Model } from 'mongoose';
import db, { connectDatabase } from './config/database.js';
import User from './models/User.js';
import Team from './models/Team.js';
import Activity from './models/Activity.js';
import Leaderboard from './models/Leaderboard.js';
import Workout from './models/Workout.js';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

async function registerResourceRoutes(resourcePath: string, model: Model<any>) {
  app.get(resourcePath, async (_request, response) => {
    const items = await model.find({});
    response.json(items);
  });

  app.get(`${resourcePath}:id`, async (request, response) => {
    const item = await model.findById(request.params.id);

    if (!item) {
      response.status(404).json({ message: 'Resource not found' });
      return;
    }

    response.json(item);
  });
}

app.get('/api/health', async (_request, response) => {
  let isConnected = Number(db.readyState) === 1;
  let databaseStatus = isConnected ? 'connected' : 'connecting';

  if (!isConnected) {
    try {
      await connectDatabase();
      isConnected = Number(db.readyState) === 1;
      databaseStatus = isConnected ? 'connected' : 'connecting';
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
      databaseStatus = 'disconnected';
    }
  }

  response.json({
    status: 'ok',
    database: databaseStatus,
    baseUrl,
  });
});

registerResourceRoutes('/api/users/', User);
registerResourceRoutes('/api/teams/', Team);
registerResourceRoutes('/api/activities/', Activity);
registerResourceRoutes('/api/leaderboard/', Leaderboard);
registerResourceRoutes('/api/workouts/', Workout);

void connectDatabase().catch((error) => {
  console.error('Failed to connect to MongoDB on startup:', error);
});

app.listen(port, () => {
  console.log(`OctoFit API listening on port ${port}`);
  console.log(`Base URL: ${baseUrl}`);
});

export { baseUrl };
