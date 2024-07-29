import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Title of the task',
    example: 'Create a new task',
  })
  @IsString()
  @MinLength(1)
  title: string;

  @ApiProperty({
    description: 'Description of the task',
    example: 'Create a new task for the project',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Project ID of the task',
    example: faker.string.uuid(),
  })
  @IsUUID()
  projectId: string;

  @ApiProperty({
    description: 'State ID of the task',
    example: faker.string.uuid(),
  })
  @IsOptional()
  @IsUUID()
  stateId?: string;

  @ApiProperty({
    description: 'Account ID of the task',
    example: faker.string.uuid(),
  })
  @IsOptional()
  @IsUUID()
  assignedToId?: string;

  @ApiProperty({
    description: 'Parent task ID of the task',
    example: faker.string.uuid(),
  })
  @IsOptional()
  @IsUUID()
  parentTaskId?: string;

  @ApiProperty({
    description: 'Start date of the task',
    example: '2021-01-01',
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({
    description: 'End date of the task',
    example: '2021-12-31',
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}
