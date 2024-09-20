import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatesService } from './states.service';
import { StatesController } from './states.controller';
import { State } from './entities/state.entity';
import { AuthModule } from '../auth/auth.module';
import { ProjectsModule } from '../projects/projects.module';

@Module({
  controllers: [StatesController],
  providers: [StatesService],
  imports: [TypeOrmModule.forFeature([State]), AuthModule, ProjectsModule],
  exports: [StatesService, TypeOrmModule],
})
export class StatesModule {}
