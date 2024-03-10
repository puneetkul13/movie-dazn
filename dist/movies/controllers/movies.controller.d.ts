import { MoviesService } from '../services/movies.service';
import { MovieSearchDto } from '../dto/moviesearch.dto';
import { AddMovieDTO } from '../dto/addmovie.dto';
import { UpdateMovieDTO } from '../dto/updatemovie.dto';
import { Cache } from '@nestjs/cache-manager';
export declare class MoviesController {
    private readonly moviesService;
    private cache;
    constructor(moviesService: MoviesService, cache: Cache);
    getMovies(): Promise<any>;
    searchMovies(searchDto: MovieSearchDto): Promise<any>;
    addMovie(addMovieDTO: AddMovieDTO): Promise<any>;
    updateMovie(id: string, updateMovieDTO: UpdateMovieDTO): Promise<any>;
    deleteMovie(id: string): Promise<any>;
}
