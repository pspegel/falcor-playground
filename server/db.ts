import mongoose from 'mongoose';

import { DB_URL } from './constants';

export const connect = () => {
  mongoose.connect(DB_URL, { useNewUrlParser: true });

  const db = mongoose.connection;

  return new Promise((resolve, reject) => {
    db.once('open', () => {
      resolve(db);
    });
    db.once('error', () => {
      reject(db);
    });
  });
};
