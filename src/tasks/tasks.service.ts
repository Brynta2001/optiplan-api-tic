import { Repository } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { Account } from '../auth/entities/account.entity';
import { State } from '../states/entities/state.entity';
import { ProjectsService } from '../projects/projects.service';
import { StatesService } from '../states/states.service';
import { Project } from '../projects/entities/project.entity';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private readonly projectsService: ProjectsService,
    private readonly statesService: StatesService,
  ) {}

  async create(createTaskDto: CreateTaskDto, account: Account) {
    const { projectId, stateId, assignedToId, parentTaskId, ...taskDetails } =
      createTaskDto;

    let state: State;
    let assignedTo: Account;
    let parentTask: Task;

    const project = await this.projectsService.findOne(projectId);

    if (stateId) {
      state = await this.statesService.findOne(stateId);
    }

    if (assignedToId) {
      assignedTo = await this.accountRepository.findOneBy({ id: assignedToId });
      if (!assignedTo) {
        throw new NotFoundException(
          `Account with id ${assignedToId} not found`,
        );
      }
    }

    if (parentTaskId) {
      parentTask = await this.findOne(parentTaskId);
    }

    try {
      const task = this.taskRepository.create({
        ...taskDetails,
        project,
        state,
        createdBy: account,
        assignedTo,
        parentTask,
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
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, account: Account) {
    const { projectId, stateId, assignedToId, parentTaskId, ...taskDetails } =
      updateTaskDto;

    let project: Project;
    let state: State;
    let assignedTo: Account;
    let parentTask: Task;

    if (projectId) {
      project = await this.projectsService.findOne(projectId);
    }

    if (stateId) {
      state = await this.statesService.findOne(stateId);
    }

    if (parentTaskId) {
      parentTask = await this.findOne(parentTaskId);
    }

    if (assignedToId) {
      assignedTo = await this.accountRepository.findOneBy({ id: assignedToId });
      if (!assignedTo) {
        throw new NotFoundException(
          `Account with id ${assignedToId} not found`,
        );
      }
      if (assignedTo.role.level <= account.role.level) {
        throw new BadRequestException(
          'You cannot assign a task to a user with a greater role',
        );
      }
    }

    const task = await this.taskRepository.preload({
      id: id,
      ...taskDetails,
      project,
      state,
      assignedTo,
      parentTask,
    });

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    try {
      return await this.taskRepository.save(task);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const task = await this.findOne(id);
    return await this.taskRepository.remove(task);
  }

  async findSubtasks(id: string) {
    // const task = await this.taskRepository.manager.getTreeRepository(Task).findDescendants(await this.findOne(id));
    const parentTask = await this.findOne(id);
    const task = await this.taskRepository.manager
      .getTreeRepository(Task)
      .findDescendantsTree(parentTask, {
        depth: 1,
        relations: [],
      });
    return task;
  }

  // Return task by createdBy
  async findByUser(account: Account) {
    const tasks = await this.taskRepository.find({
      where: [
        { assignedTo: { id: account.id } },
        { createdBy: { id: account.id } },
      ],
      relations: ['assignedTo', 'createdBy', 'state', 'project'],
    });
    return tasks.map((task) => {
      return {
        id: task.id,
        title: task.title,
        description: task.description,
        state: task.state,
        project: {
          id: task.project.id,
          title: task.project.title,
        },
        createdBy: {
          id: task.createdBy.id,
          name: task.createdBy.user.fullName,
          role: task.createdBy.role.name,
        },
        assignedTo: task.assignedTo
          ? {
              id: task.assignedTo.id,
              name: task.assignedTo.user.fullName,
              role: task.assignedTo.role.name,
            }
          : null,
      };
    });
  }

  /*async findSubtasksByUser(account: Account) {
    const parentTasks = await this.findByUser(account);

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
  }*/

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
