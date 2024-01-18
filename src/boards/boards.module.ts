import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { Board } from './entities/board.entity';
import { Stage } from '../stages/entities/stage.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [BoardsController],
  providers: [BoardsService],
  imports: [
    TypeOrmModule.forFeature([Board, Stage]),
    AuthModule,
  ],
  exports: [BoardsService, TypeOrmModule],
})
export class BoardsModule {}
