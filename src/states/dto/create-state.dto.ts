import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsString } from 'class-validator';

export class CreateStateDto {
  @ApiProperty({
    description: 'Name of the state',
    example: 'New',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Sequence of the state',
    example: 0,
  })
  @IsInt()
  @IsPositive()
  sequence: number;
}
