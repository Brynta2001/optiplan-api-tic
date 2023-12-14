import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { StagesService } from '../stages/stages.service';

@Injectable()
export class TasksService {

  private readonly logger = new Logger('TasksService')

  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    
    private readonly stageService: StagesService,
  ){}

  async create(createTaskDto: CreateTaskDto) {
    const { stageId, ...taskDetails } = createTaskDto;

    const stage = await this.stageService.findOne(stageId);

    try {
      const task = this.taskRepository.create({
        ...taskDetails,
        stage: stage,
      });
      await this.taskRepository.save(task);
      return task;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  findAll() {
    return `This action returns all tasks`;
  }

  findOne(id: string) {
    const task = this.taskRepository.findOneBy({id});
    if (!task){
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const { stageId, ...toUpdate } = updateTaskDto;

    const stage = await this.stageService.findOne(stageId);

    const task = await this.taskRepository.preload({id: id, stage: stage, ...toUpdate})
    if (!task){
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    try {
      await this.taskRepository.save(task);
      return task;
    } catch (error) {
      this.handleDBExceptions(error);
    }

  }

  async remove(id: string) {
    const task = await this.findOne(id);
    if (!task){
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    await this.taskRepository.remove(task);
  }

  private handleDBExceptions(error:any){
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    //console.log(error)
    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected error, check server logs')
  }
}
