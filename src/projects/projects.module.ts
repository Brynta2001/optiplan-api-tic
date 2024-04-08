import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Project } from './entities/project.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService],
  imports: [TypeOrmModule.forFeature([Project]), AuthModule],
  exports: [ProjectsService],
})
export class ProjectsModule {}
