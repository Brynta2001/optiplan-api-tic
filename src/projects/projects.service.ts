import { Repository } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Account } from 'src/auth/entities/account.entity';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  private readonly logger = new Logger(ProjectsService.name);

  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto, account: Account) {
    try {
      const project = this.projectRepository.create({
        ...createProjectDto,
        createdBy: account,
      });
      return await this.projectRepository.save(project);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(account: Account) {
    try {
      return await this.projectRepository.find({
        where: { createdBy: { id: account.id } },
      });
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findOne(id: string) {
    const project = await this.projectRepository.findOneBy({ id });
    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }
    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectRepository.preload({
      id,
      ...updateProjectDto,
    });
    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }
    try {
      return await this.projectRepository.save(project);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const project = await this.findOne(id);
    return await this.projectRepository.remove(project);
  }

  async findStates(id: string) {
    const project = await this.findOne(id);
    return project.states;
  }

  async findTasks(id: string) {
    const project = await this.findOne(id);
    return project.tasks;
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
