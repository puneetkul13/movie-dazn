// sample.model.ts

import * as mongoose from 'mongoose';

export const MoviesSchema = new mongoose.Schema({
  movieName: String,
  genre: String,
  rating: Number,
  streamingLink: String,
});

export const SampleModel = mongoose.model('Movies', MoviesSchema);
