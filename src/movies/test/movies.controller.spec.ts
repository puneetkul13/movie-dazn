// movies.controller.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from '../controllers/movies.controller';
import { MoviesService } from '../services/movies.service';
import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { UpdateWriteOpResult } from 'mongoose';
import { AddMovieDTO } from '../dto/addmovie.dto';
import { UpdateMovieDTO } from '../dto/updatemovie.dto';
import { DeleteResult, ObjectId } from 'mongodb';
import { RoleGuard } from '../guards/role.guard';
import { AuthGuard } from '../guards/auth.guards';
import { UsersService } from '../services/users.service';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
// Mocking the Movie Model
const movieModelMock = {
  find: jest.fn(),
};
const usersModelMock = {
  find: jest.fn(),
};
const cacheMock = {
  get: jest.fn(),
  // Add other cache methods as needed
  set: jest.fn(),
  reset: jest.fn(),
} as unknown as Cache;
describe('MoviesController', () => {
  let app: INestApplication;
  let moviesController: MoviesController;
  let moviesService: MoviesService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        MoviesService,
        AuthGuard,
        RoleGuard,
        UsersService,
        {
          provide: getModelToken('Movies'), // Assuming 'Movie' is the name of your model
          useValue: movieModelMock,
        },
        {
          provide: getModelToken('Users'), // Assuming 'Movie' is the name of your model
          useValue: usersModelMock,
        },
        {
          provide: CACHE_MANAGER,
          useValue: cacheMock,
        },
      ],
    }).compile();
    // cacheMock = module.get(CACHE_MANAGER);
    app = module.createNestApplication();
    await app.init();
  });

  beforeEach(() => {
    moviesController = app.get<MoviesController>(MoviesController);
    moviesService = app.get<MoviesService>(MoviesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await app.close();
  });
  describe('GET /movies', () => {
    it('should return an array of movies', async () => {
      // Mock the service method

      const mockMovies = [{ title: 'Movie 1' }, { title: 'Movie 2' }];
      jest.spyOn(moviesService, 'getMovies').mockResolvedValue(mockMovies);
      //   cacheMock.get.mockResolvedValueOnce(undefined);
      // Make the request
      (cacheMock.get as jest.Mock).mockResolvedValueOnce(undefined);
      (cacheMock.set as jest.Mock).mockResolvedValueOnce(undefined);
      const response = await moviesController.getMovies();

      expect(response).toEqual(mockMovies);
    });
  });

  describe('GET /movies/search', () => {
    it('should return movies based on search criteria', async () => {
      // Mock the service method
      const mockMovies = [{ title: 'Movie 1', genre: 'Action' }];
      jest.spyOn(moviesService, 'searchMovies').mockResolvedValue(mockMovies);

      // Make the request
      (cacheMock.get as jest.Mock).mockResolvedValueOnce(undefined);
      (cacheMock.set as jest.Mock).mockResolvedValueOnce(undefined);
      const response = await moviesController.searchMovies({
        movieName: 'Movie 1',
        genre: 'Action',
      });
      // Assertions
      expect(response).toEqual(mockMovies);
    });
  });

  describe('addMovie', () => {
    it('should add a movie', async () => {
      const addMovieDTO: AddMovieDTO = {
        movieName: 'Test Movie',
        genre: 'Action',
        rating: 4.5,
        streamingLink: 'https://example.com/movie',
      };

      jest.spyOn(moviesService, 'addMovie').mockResolvedValueOnce(addMovieDTO);
      (cacheMock.reset as jest.Mock).mockResolvedValueOnce(undefined);
      const result = await moviesController.addMovie(addMovieDTO);

      expect(result).toEqual(addMovieDTO);
    });
  });

  describe('updateMovie', () => {
    it('should update a movie', async () => {
      const movieId = '123';
      const updateMovieDTO: UpdateMovieDTO = {
        movieName: '',
        genre: '',
        rating: 0,
        streamingLink: '',
      };
      const updateWriteOpResult: UpdateWriteOpResult = {
        acknowledged: false,
        matchedCount: 0,
        modifiedCount: 0,
        upsertedCount: 0,
        upsertedId: new ObjectId(),
      };
      jest
        .spyOn(moviesService, 'updateMovie')
        .mockResolvedValueOnce(updateWriteOpResult);
      (cacheMock.reset as jest.Mock).mockResolvedValueOnce(undefined);
      const result = await moviesController.updateMovie(
        movieId,
        updateMovieDTO,
      );

      expect(result).toEqual(updateWriteOpResult);
    });
  });

  describe('deleteMovie', () => {
    it('should delete a movie', async () => {
      const movieId = '123';
      const deleteResult: DeleteResult = {
        acknowledged: false,
        deletedCount: 0,
      };
      jest
        .spyOn(moviesService, 'deleteMovie')
        .mockResolvedValueOnce(deleteResult);
      (cacheMock.reset as jest.Mock).mockResolvedValueOnce(undefined);
      const result = await moviesController.deleteMovie(movieId);

      expect(result).toEqual(deleteResult);
    });
  });
});
