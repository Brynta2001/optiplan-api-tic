import { IsString, IsUUID, MinLength } from "class-validator";

export class CreateStageDto {
    @IsString()
    @MinLength(1)
    name: string;
    
    @IsUUID()
    boardId: string;
}
