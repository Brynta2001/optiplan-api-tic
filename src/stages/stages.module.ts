import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StagesService } from './stages.service';
import { StagesController } from './stages.controller';
import { Stage } from './entities/stage.entity';
import { Board } from 'src/boards/entities/board.entity';

@Module({
  controllers: [StagesController],
  providers: [StagesService],
  imports: [
    TypeOrmModule.forFeature([Stage, Board]),
  ],
  exports: [StagesService]
})
export class StagesModule {}
