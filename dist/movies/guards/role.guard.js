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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleGuard = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../services/users.service");
const jwt = require("jsonwebtoken");
const core_1 = require("@nestjs/core");
const lodash_1 = require("lodash");
let RoleGuard = class RoleGuard {
    constructor(usersService, reflector) {
        this.usersService = usersService;
        this.reflector = reflector;
    }
    async canActivate(context) {
        const roles = this.reflector.get('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization || request.query.Authorization;
        if (!token)
            return false;
        const decodded = await jwt.verify(token, 'your-secure-secret-key');
        if (!decodded) {
            return false;
        }
        const username = decodded['username'];
        let user = await this.usersService.getUserByUsername(username);
        if (user.length === 0) {
            return false;
        }
        user = user[0];
        const userRoles = user['roles'];
        const diff = (0, lodash_1.intersection)(userRoles, roles);
        return diff.length > 0;
    }
};
exports.RoleGuard = RoleGuard;
exports.RoleGuard = RoleGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        core_1.Reflector])
], RoleGuard);
//# sourceMappingURL=role.guard.js.map