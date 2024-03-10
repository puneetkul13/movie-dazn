// sample.model.ts

import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  roles: [
    {
      type: String,
    },
  ],
});

export const SampleModel = mongoose.model('Users', UserSchema);
