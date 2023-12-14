import { Module, forwardRef } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { Repository } from 'typeorm';
import { StagesModule } from 'src/stages/stages.module';
import { Stage } from 'src/stages/entities/stage.entity';

@Module({
  controllers: [BoardsController],
  providers: [BoardsService],
  imports: [
    TypeOrmModule.forFeature([Board]),
    StagesModule,
  ],
  exports: [TypeOrmModule]
})
export class BoardsModule {}
