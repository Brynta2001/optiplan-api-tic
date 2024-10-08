import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';

export class LoginAccountDto {
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
    enum: [
      'business_manager',
      'area_manager',
      'area_leader',
      'technician',
      'admin',
    ],
  })
  @IsIn([
    'business_manager',
    'area_manager',
    'area_leader',
    'technician',
    'admin',
  ])
  role: string;
}
