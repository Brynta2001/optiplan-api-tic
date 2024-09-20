import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({
    example: 'Project title',
    description: 'The title of the project',
    required: true,
  })
  @IsString()
  @MinLength(0)
  title: string;

  @ApiProperty({
    example: 'Project description',
    description: 'The description of the project',
    required: false,
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    example: 'PRJ',
    description: 'The code of the project',
    required: true,
  })
  @IsString()
  @Length(3, 3)
  code: string;

  @ApiProperty({
    example: '2021-01-01',
    description: 'The start date of the project',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @ApiProperty({
    example: '2021-12-31',
    description: 'The end date of the project',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  endDate?: Date;
}
