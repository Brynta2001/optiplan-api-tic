import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';

export class LoginAccountDto {
  @IsEmail()
  email: string;

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
