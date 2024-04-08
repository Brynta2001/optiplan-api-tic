import { IsOptional, IsString, Length, MinLength } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @MinLength(0)
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @Length(3, 3)
  code: string;
}
