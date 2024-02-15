import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatesService } from './states.service';
import { StatesController } from './states.controller';
import { State } from './entities/state.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ProjectsModule } from 'src/projects/projects.module';

@Module({
  controllers: [StatesController],
  providers: [StatesService],
  imports: [
    TypeOrmModule.forFeature([State]),
    AuthModule,
    ProjectsModule,
  ],
})
export class StatesModule {}
