import { IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class CreateBoardDto {
    @IsString()
    @MinLength(1)
    name: string;
    
    @IsString()
    @IsOptional()
    description?: string;
    
    @IsNumber()
    @IsPositive()
    columns: number;
}
