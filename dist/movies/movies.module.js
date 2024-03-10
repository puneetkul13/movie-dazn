"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesMoudle = void 0;
const common_1 = require("@nestjs/common");
const movies_service_1 = require("./services/movies.service");
const movies_controller_1 = require("./controllers/movies.controller");
const movies_schema_1 = require("./schemas/movies.schema");
const mongoose_1 = require("@nestjs/mongoose");
const users_schema_1 = require("./schemas/users.schema");
const users_service_1 = require("./services/users.service");
const users_controller_1 = require("./controllers/users.controller");
const jwt_1 = require("@nestjs/jwt");
const cache_manager_1 = require("@nestjs/cache-manager");
let MoviesMoudle = class MoviesMoudle {
};
exports.MoviesMoudle = MoviesMoudle;
exports.MoviesMoudle = MoviesMoudle = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Movies', schema: movies_schema_1.MoviesSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Users', schema: users_schema_1.UserSchema }]),
            mongoose_1.MongooseModule.forRoot('mongodb://localhost:27017/dazn-movies'),
            jwt_1.JwtModule.register({
                secret: 'your-secure-secret-key',
                signOptions: { expiresIn: '1h' },
            }),
            cache_manager_1.CacheModule.register(),
        ],
        providers: [movies_service_1.MoviesService, users_service_1.UsersService],
        controllers: [movies_controller_1.MoviesController, users_controller_1.UsersController],
    })
], MoviesMoudle);
//# sourceMappingURL=movies.module.js.map