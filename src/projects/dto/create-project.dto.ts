import { IsString, Length, MinLength } from "class-validator";

export class CreateProjectDto {
    @IsString()
    @MinLength(0)
    title: string;

    @IsString()
    description: string;

    @IsString()
    @Length(4, 4)
    code: string;
}
