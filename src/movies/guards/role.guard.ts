// import {
//     Injectable, CanActivate, ExecutionContext
//   } from '@nestjs/common';
//   import { Reflector } from '@nestjs/core';
//   import { intersection } from 'lodash';
//   import { STATUS } from 'src/kernel/constants';
//   import { AuthService } from '../services';

//   @Injectable()
//   export class RoleGuard implements CanActivate {
//     constructor(
//       private readonly reflector: Reflector,
//       private readonly authService: AuthService
//     ) { }

//     async canActivate(context: ExecutionContext): Promise<boolean> {
//       const roles = this.reflector.get<string[]>('roles', context.getHandler());
//       if (!roles) {
//         return true;
//       }

//       const request = context.switchToHttp().getRequest();
//       const token = request.headers.authorization || request.query.Authorization;
//       if (!token) return false;
//       const decodded = await this.authService.verifyJWT(token);
//       if (!decodded) {
//         return false;
//       }
//       const user = request.user || await this.authService.getSourceFromJWT(token);
//       if (!user || user.status !== STATUS.ACTIVE) {
//         return false;
//       }
//       if (!request.user) request.user = user;
//       request.authUser = request.authUser || decodded;
//       if (!request.jwToken) request.jwToken = token;
//       if (user.isPerformer && roles.includes('performer')) {
//         return true;
//       }
//       const diff = intersection(user.roles, roles);
//       return diff.length > 0;
//     }
//   }

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import * as jwt from 'jsonwebtoken';
import { Reflector } from '@nestjs/core';
import { intersection } from 'lodash';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly usersService: UsersService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization || request.query.Authorization;
    if (!token) return false;
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
    const diff = intersection(userRoles, roles);
    return diff.length > 0;
  }
}
