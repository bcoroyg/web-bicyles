import mongoose from 'mongoose';
import config from '../config/index.js';

const DB_USER = encodeURIComponent(config.dbUser);
const DB_PASSWORD = encodeURIComponent(config.dbPassword);

const MONGO_URI = config.dev
  ? `mongodb://${config.dbHost}:${config.dbPort}/${config.dbName}?retryWrites=true&w=majority`
  : `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${config.dbHost}/${config.dbName}?retryWrites=true&w=majority`;

const connectionDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connect success DB');
  } catch (error) {
    throw new Error('Error connect DB');
  }
};

export default connectionDB;
