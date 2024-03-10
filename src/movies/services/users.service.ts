/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
// import { MoviesModel } from '../schemas/movies.schema';
@Injectable()
export class UsersService {
  constructor(@InjectModel('Users') private readonly usersModel: Model<any>) {}

  public async getUser(query: any) {
    const res = await this.usersModel.find(query);
    return res;
  }
  public async getUserByUsername(username: string) {
    const res = await this.usersModel.find({ username });
    return res;
  }
}
