import {
  Controller,
  Injectable,
  HttpCode,
  HttpStatus,
  Get,
  Query,
  UseGuards,
  Post,
  Body,
  HttpException,
  Put,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';

import { MoviesService } from '../services/movies.service';
import { MovieSearchDto } from '../dto/moviesearch.dto';
import { AuthGuard } from '../guards/auth.guards';
import { AddMovieDTO } from '../dto/addmovie.dto';
import { Roles } from '../decorators/roles.decorator';
import { RoleGuard } from '../guards/role.guard';
import { UpdateMovieDTO } from '../dto/updatemovie.dto';
import { Cache } from '@nestjs/cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
@Injectable()
@Controller('movies')
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    @Inject(CACHE_MANAGER) private cache: Cache,
  ) {}

  @Get('')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async getMovies(): Promise<any> {
    try {
      const cacheKey = 'movies';
      const cachedMovies = await this.cache.get(cacheKey);
      if (cachedMovies) {
        return cachedMovies;
      }
      const movies = await this.moviesService.getMovies();
      await this.cache.set(cacheKey, movies);
      return movies;
    } catch (error) {
      return error;
    }
  }
  @Get('search')
  @UseGuards(AuthGuard)
  async searchMovies(@Query() searchDto: MovieSearchDto): Promise<any> {
    const { movieName, genre } = searchDto;
    const query: any = {};
    if (movieName) {
      query.movieName = { $regex: new RegExp(movieName, 'i') }; // Case-insensitive title search
    }

    if (genre) {
      query.genre = genre; // Exact match for genre
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

  @Post('')
  @Roles('Admin')
  @UseGuards(RoleGuard)
  async addMovie(@Body() addMovieDTO: AddMovieDTO): Promise<any> {
    const { movieName, genre, rating, streamingLink } = addMovieDTO;
    if (!movieName || !genre || !rating || !streamingLink) {
      throw new HttpException('Parameters are missing', 400);
    }
    const res = await this.moviesService.addMovie(addMovieDTO);
    await this.cache.reset();
    return res;
  }

  @Put('/:id')
  @Roles('Admin')
  @UseGuards(RoleGuard)
  async updateMovie(
    @Param('id') id: string,
    @Body() updateMovieDTO: UpdateMovieDTO,
  ): Promise<any> {
    const res = await this.moviesService.updateMovie(id, updateMovieDTO);
    await this.cache.reset();
    return res;
  }

  @Delete('/:id')
  @Roles('Admin')
  @UseGuards(RoleGuard)
  async deleteMovie(@Param('id') id: string): Promise<any> {
    const res = await this.moviesService.deleteMovie(id);
    await this.cache.reset();
    return res;
  }
}
