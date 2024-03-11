import { IsString, IsNotEmpty, ArrayNotEmpty } from 'class-validator';

export class registerDTO {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString({ each: true })
  @ArrayNotEmpty()
  roles: string[];
}
