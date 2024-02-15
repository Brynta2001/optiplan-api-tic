import { Repository } from 'typeorm';
import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { ProjectsService } from '../projects/projects.service';
import { State } from './entities/state.entity';

@Injectable()
export class StatesService {

  private readonly logger = new Logger(StatesService.name);

  constructor(
    @InjectRepository(State)
    private readonly stateRepository: Repository<State>,
    private readonly projectService: ProjectsService,
  ) {}
  async create(createStateDto: CreateStateDto) {
    console.log(createStateDto);
    const { projectId, ...stateDetails } = createStateDto;
    const project = await this.projectService.findOne(projectId);
    
    try {
      const state = this.stateRepository.create({
        ...stateDetails,
        project,
      });
      await this.stateRepository.save(state);
      return {
        ...state,
        project: {
          id: state.project.id,
          title: state.project.title,
        }
      }
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    const states = await this.stateRepository.find();
    return states;
  }

  async findOne(id: string) {
    const state = await this.stateRepository.findOneBy({id});
    if (!state) {
      throw new NotFoundException(`State with id ${id} not found`);
    }
    return state;
  }

  async update(id: string, updateStateDto: UpdateStateDto) {
    const state = await this.stateRepository.preload({id, ...updateStateDto});
    if (!state) {
      throw new NotFoundException(`State with id ${id} not found`);
    }
    try {
      return await this.stateRepository.save(state);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const state = await this.findOne(id);
    return await this.stateRepository.remove(state);
  }

  private handleDBExceptions(error:any){
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected error, check server logs')
  }
}
