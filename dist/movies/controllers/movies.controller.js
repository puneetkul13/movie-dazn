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
exports.MoviesController = void 0;
const common_1 = require("@nestjs/common");
const movies_service_1 = require("../services/movies.service");
const moviesearch_dto_1 = require("../dto/moviesearch.dto");
const auth_guards_1 = require("../guards/auth.guards");
const addmovie_dto_1 = require("../dto/addmovie.dto");
const roles_decorator_1 = require("../decorators/roles.decorator");
const role_guard_1 = require("../guards/role.guard");
const updatemovie_dto_1 = require("../dto/updatemovie.dto");
const cache_manager_1 = require("@nestjs/cache-manager");
const cache_manager_2 = require("@nestjs/cache-manager");
let MoviesController = class MoviesController {
    constructor(moviesService, cache) {
        this.moviesService = moviesService;
        this.cache = cache;
    }
    async getMovies() {
        try {
            const cacheKey = 'movies';
            const cachedMovies = await this.cache.get(cacheKey);
            if (cachedMovies) {
                return cachedMovies;
            }
            const movies = await this.moviesService.getMovies();
            await this.cache.set(cacheKey, movies);
            return movies;
        }
        catch (error) {
            return error;
        }
    }
    async searchMovies(searchDto) {
        const { movieName, genre } = searchDto;
        const query = {};
        if (movieName) {
            query.movieName = { $regex: new RegExp(movieName, 'i') };
        }
        if (genre) {
            query.genre = genre;
        }
        const cacheKey = `movies:${movieName}${genre}`;
        const cachedMovies = await this.cache.get(cacheKey);
        if (cachedMovies) {
            return cachedMovies;
        }
        const movies = await this.moviesService.searchMovies(query);
        await this.cache.set(cacheKey, movies);
        return movies;
    }
    async addMovie(addMovieDTO) {
        const { movieName, genre, rating, streamingLink } = addMovieDTO;
        if (!movieName || !genre || !rating || !streamingLink) {
            throw new common_1.HttpException('Parameters are missing', 400);
        }
        const res = await this.moviesService.addMovie(addMovieDTO);
        await this.cache.reset();
        return res;
    }
    async updateMovie(id, updateMovieDTO) {
        const res = await this.moviesService.updateMovie(id, updateMovieDTO);
        await this.cache.reset();
        return res;
    }
    async deleteMovie(id) {
        const res = await this.moviesService.deleteMovie(id);
        await this.cache.reset();
        return res;
    }
};
exports.MoviesController = MoviesController;
__decorate([
    (0, common_1.Get)(''),
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "getMovies", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [moviesearch_dto_1.MovieSearchDto]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "searchMovies", null);
__decorate([
    (0, common_1.Post)(''),
    (0, roles_decorator_1.Roles)('Admin'),
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [addmovie_dto_1.AddMovieDTO]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "addMovie", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, roles_decorator_1.Roles)('Admin'),
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updatemovie_dto_1.UpdateMovieDTO]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "updateMovie", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, roles_decorator_1.Roles)('Admin'),
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "deleteMovie", null);
exports.MoviesController = MoviesController = __decorate([
    (0, common_1.Injectable)(),
    (0, common_1.Controller)('movies'),
    __param(1, (0, common_1.Inject)(cache_manager_2.CACHE_MANAGER)),
    __metadata("design:paramtypes", [movies_service_1.MoviesService,
        cache_manager_1.Cache])
], MoviesController);
//# sourceMappingURL=movies.controller.js.map