import { IsOptional, IsString, IsUUID, MinLength } from "class-validator";

export class CreateTaskDto {
    @IsString()
    @MinLength(1)
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsOptional()
    @IsUUID()
    assignedToId?: string;

    @IsOptional()
    @IsUUID()
    parentTaskId?: string;

    @IsOptional()
    @IsUUID()
    stageId?: string;
}
