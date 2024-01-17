import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './entities/task.entity';
import { StagesModule } from '../stages/stages.module';
import { AuthModule } from 'src/auth/auth.module';
import { Activity } from './entities/activity.entity';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [
    TypeOrmModule.forFeature([Task, Activity]),
    StagesModule,
    AuthModule,
  ],
})
export class TasksModule {}
