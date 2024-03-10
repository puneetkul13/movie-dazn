import { Module } from '@nestjs/common';
import { MoviesService } from './services/movies.service';
import { MoviesController } from './controllers/movies.controller';
import { MoviesSchema } from './schemas/movies.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/users.schema';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { JwtModule } from '@nestjs/jwt';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Movies', schema: MoviesSchema }]),
    MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }]),
    MongooseModule.forRoot('mongodb://localhost:27017/dazn-movies'),
    JwtModule.register({
      secret: 'your-secure-secret-key', // Replace with a secure secret key
      signOptions: { expiresIn: '1h' },
    }),
    CacheModule.register(),
  ],
  providers: [MoviesService, UsersService],
  controllers: [MoviesController, UsersController],
})
export class MoviesMoudle {}
