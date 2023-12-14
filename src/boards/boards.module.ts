import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { Repository } from 'typeorm';

@Module({
  controllers: [BoardsController],
  providers: [BoardsService],
  imports: [
    TypeOrmModule.forFeature([Board])
  ],
})
export class BoardsModule {}
