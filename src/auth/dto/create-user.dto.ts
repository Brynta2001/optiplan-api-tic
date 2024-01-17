import { IsArray, IsEmail, IsIn, IsString, Matches, MaxLength, Min, MinLength } from "class-validator";
import { ValidRoles } from "../interfaces/roles.interface";

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have an Uppercase, lowercase letter and a number'
    })
    password: string;

    @IsString()
    @MinLength(1)
    fullName: string;

    @IsArray()
    @IsIn(['business_manager', 'area_manager', 'area_leader', 'technician', 'admin'], {
        each: true,
    })
    roles: string[];

    @IsString()
    department: string;
}