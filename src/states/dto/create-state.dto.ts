import { IsInt, IsPositive, IsString } from 'class-validator';

export class CreateStateDto {
  @IsString()
  name: string;

  @IsInt()
  @IsPositive()
  sequence: number;
}
