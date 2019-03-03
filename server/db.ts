import mongoose from 'mongoose';

import { DB_URL } from './constants';

export default mongoose.connect(DB_URL, { useNewUrlParser: true });
