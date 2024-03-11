import { LoginDto } from '../dto/login.dto';
import { UsersService } from '../services/users.service';
import { JwtService } from '@nestjs/jwt';
import { registerDTO } from '../dto/register.dto';
export declare class UsersController {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    login(loginDto: LoginDto): Promise<any>;
    register(registerDto: registerDTO): Promise<any>;
}
