import mongoose from 'mongoose';

import User from './user';
import Scope from './scope';
import Entry from './entry';

const connectDb = () => {
  mongoose.set('useCreateIndex', true);
  return mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
};

const models = { User, Scope, Entry };

export { connectDb };

export default models;