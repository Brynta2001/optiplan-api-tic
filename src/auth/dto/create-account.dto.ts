import {
  IsArray,
  IsEmail,
  IsIn,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';
// import { ValidRoles } from '../interfaces/roles.interface';

export class CreateAccountDto {
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

  @IsString()
  @MinLength(1)
  fullName: string;

  // @IsArray()
  // @IsIn(['business_manager', 'area_manager', 'area_leader', 'technician', 'admin'], {
  //     each: true,
  // })
  @IsArray()
  @IsIn(
    ['business_manager', 'area_manager', 'area_leader', 'technician', 'admin'],
    {
      each: true,
    },
  )
  roles: string[];

  @IsString()
  department: string;
}
