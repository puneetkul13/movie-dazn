import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMovieDTO {
  @ApiProperty()
  @IsString()
  @IsOptional()
  movieName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  genre: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  rating: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  streamingLink: string;
}
