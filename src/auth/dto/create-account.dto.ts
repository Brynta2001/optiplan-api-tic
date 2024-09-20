import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsIn,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateAccountDto {
  @ApiProperty({
    example: faker.internet.email().toLowerCase(),
    description: 'The email of the user',
    nullable: false,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: faker.internet.password(),
    description: 'The password of the user',
    nullable: false,
  })
  @IsString()
  @MaxLength(50)
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  @ApiProperty({
    example: faker.person.fullName(),
    description: 'The full name of the user',
    nullable: false,
  })
  @IsString()
  @MinLength(1)
  fullName: string;

  @ApiProperty({
    example: ['business_manager', 'area_manager'],
    enum: [
      'business_manager',
      'area_manager',
      'area_leader',
      'technician',
      'admin',
    ],
    description: 'The roles of the user',
    nullable: false,
  })
  @IsArray()
  @IsIn(
    ['business_manager', 'area_manager', 'area_leader', 'technician', 'admin'],
    {
      each: true,
    },
  )
  roles: string[];

  @ApiProperty({
    example: 'TI',
    description: 'The department of the user',
    nullable: false,
  })
  @IsString()
  department: string;
}
