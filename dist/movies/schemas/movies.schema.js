"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SampleModel = exports.MoviesSchema = void 0;
const mongoose = require("mongoose");
exports.MoviesSchema = new mongoose.Schema({
    movieName: String,
    genre: String,
    rating: Number,
    streamingLink: String,
});
exports.SampleModel = mongoose.model('Movies', exports.MoviesSchema);
//# sourceMappingURL=movies.schema.js.map