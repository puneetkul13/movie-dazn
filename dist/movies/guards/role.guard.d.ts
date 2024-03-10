import { CanActivate, ExecutionContext } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { Reflector } from '@nestjs/core';
export declare class RoleGuard implements CanActivate {
    private readonly usersService;
    private readonly reflector;
    constructor(usersService: UsersService, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
