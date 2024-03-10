"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SampleModel = exports.UserSchema = void 0;
const mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    roles: [
        {
            type: String,
        },
    ],
});
exports.SampleModel = mongoose.model('Users', exports.UserSchema);
//# sourceMappingURL=users.schema.js.map