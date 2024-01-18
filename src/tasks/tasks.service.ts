import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { StagesService } from '../stages/stages.service';
import { User } from '../auth/entities/user.entity';
import { LevelRoles } from '../auth/interfaces/roles.interface';

@Injectable()
export class TasksService {

  private readonly logger = new Logger('TasksService')

  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    
    private readonly stageService: StagesService,
  ){}

  async create(createTaskDto: CreateTaskDto, user: User) {
    const { stageId, assignedToId, parentTaskId, ...taskDetails } = createTaskDto;
    let assignedTo: User;
    let parentTask: Task;

    const stage = await this.stageService.findOne(stageId);
    if (assignedToId){
      assignedTo = await this.userRepository.findOneBy({id: assignedToId});
      if (!assignedTo){
        throw new NotFoundException(`User with id ${assignedToId} not found`);
      }
    }

    if (parentTaskId){
      parentTask = await this.findOne(parentTaskId);
    }   

    try {
      const task = this.taskRepository.create({
        ...taskDetails,
        stage: stage,
        assignedTo: assignedTo,
        parentTask: parentTask,
        createdBy: user,
        level: LevelRoles[user.roles[0]],
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

  async findOne(id: string) {
    const task = await this.taskRepository.findOneBy({id});
    if (!task){
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  async findSubtasks(id: string) {
    // const task = await this.taskRepository.manager.getTreeRepository(Task).findDescendants(await this.findOne(id));
    const parentTask = await this.findOne(id)
    const task = await this.taskRepository.manager
      .getTreeRepository(Task)
      .findDescendantsTree(parentTask, {
        depth: 1, 
        relations: []
      });
    return task;
  }

  // TODO: Return task by assignedTo and createdBy
  async findByUser(user: User) {
    const tasks = await this.taskRepository.find({
      where: [
        //{assignedTo: {id: user.id}},
        {createdBy: {id: user.id}},

      ],
      relations: ['assignedTo', 'createdBy', 'stage']
    })
    return tasks;
  }

  async findSubtasksByUser(user: User) {
    const parentTasks = await this.findByUser(user);

    parentTasks.forEach(async (task) => {
      const subtasks = await this.taskRepository.manager
        .getTreeRepository(Task)
        .findDescendantsTree(task, {
          depth: 1, 
          relations: []
        });
      task = subtasks;
    });

    return parentTasks;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const { stageId, assignedToId, ...toUpdate } = updateTaskDto;

    const stage = await this.stageService.findOne(stageId);
    const user = await this.userRepository.findOneBy({id: assignedToId})

    const task = await this.taskRepository.preload({id: id, stage: stage, assignedTo: user, ...toUpdate})
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
