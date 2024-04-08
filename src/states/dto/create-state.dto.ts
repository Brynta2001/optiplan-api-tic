import { IsInt, IsPositive, IsString, IsUUID } from 'class-validator';

export class CreateStateDto {
  @IsString()
  name: string;

  @IsInt()
  @IsPositive()
  sequence: number;

  @IsUUID()
  projectId: string;
}
