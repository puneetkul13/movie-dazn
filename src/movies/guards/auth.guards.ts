import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
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
    if (!request.user) request.user = user;
    if (!request.authUser) request.authUser = decodded;
    if (!request.jwToken) request.jwToken = token;
    return true;
  }
}
