"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const mongodb_1 = require("mongodb");
let MoviesService = class MoviesService {
    constructor(moviesModel) {
        this.moviesModel = moviesModel;
    }
    async getMovies() {
        const res = await this.moviesModel.find({});
        return res;
    }
    async searchMovies(query) {
        const res = await this.moviesModel.find(query);
        return res;
    }
    async addMovie(query) {
        const res = await this.moviesModel.create(query);
        return res;
    }
    async updateMovie(id, query) {
        const res = await this.moviesModel.updateOne({ _id: new mongodb_1.ObjectId(id) }, query);
        return res;
    }
    async deleteMovie(id) {
        const res = await this.moviesModel.deleteOne({ _id: new mongodb_1.ObjectId(id) });
        return res;
    }
};
exports.MoviesService = MoviesService;
exports.MoviesService = MoviesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('Movies')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], MoviesService);
//# sourceMappingURL=movies.service.js.map