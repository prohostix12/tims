import mongoose from 'mongoose';
import { CourseFinderQuestion } from './src/models/CourseFinderQuestion';

// Ensure you have dotenv if needed, or run with `dotenv -e .env.local -- ts-node seed-cf.ts`
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://user:pass@cluster.mongodb.net/tims"; 
// Wait, to safely insert, I'll just write an API route that can be called once, instead of writing a script.
