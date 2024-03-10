/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AddMovieDTO } from '../dto/addmovie.dto';
import { UpdateMovieDTO } from '../dto/updatemovie.dto';
import { ObjectId } from 'mongodb';
// import { MoviesModel } from '../schemas/movies.schema';
@Injectable()
export class MoviesService {
  constructor(
    @InjectModel('Movies') private readonly moviesModel: Model<any>,
  ) {}

  public async getMovies() {
    const res = await this.moviesModel.find({});
    return res;
  }
  public async searchMovies(query: any) {
    const res = await this.moviesModel.find(query);
    return res;
  }

  public async addMovie(query: AddMovieDTO) {
    const res = await this.moviesModel.create(query);
    return res;
  }
  public async updateMovie(id: string, query: UpdateMovieDTO) {
    const res = await this.moviesModel.updateOne(
      { _id: new ObjectId(id) },
      query,
    );
    return res;
  }

  public async deleteMovie(id: string): Promise<any> {
    const res = await this.moviesModel.deleteOne({ _id: new ObjectId(id) });
    return res;
  }
}
