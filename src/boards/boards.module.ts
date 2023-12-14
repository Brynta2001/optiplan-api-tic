import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { StagesModule } from '../stages/stages.module';
import { Stage } from '../stages/entities/stage.entity';

@Module({
  controllers: [BoardsController],
  providers: [BoardsService],
  imports: [
    TypeOrmModule.forFeature([Board, Stage]),
    StagesModule,
  ],
  exports: [TypeOrmModule, BoardsService]
})
export class BoardsModule {}
