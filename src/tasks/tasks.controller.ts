import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ValidRoles } from '../auth/interfaces/roles.interface';
import { Auth, GetAccount } from '../auth/decorators';
import { Account } from '../auth/entities/account.entity';

@ApiTags('Tasks')
@ApiBearerAuth()
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOperation({ summary: 'Create a new task' })
  @ApiCreatedResponse({
    description: 'Task successfully created',
  })
  @Post()
  @Auth(
    ValidRoles.businessManager,
    ValidRoles.areaManager,
    ValidRoles.areaLeader,
    ValidRoles.technician,
  )
  create(@Body() createTaskDto: CreateTaskDto, @GetAccount() account: Account) {
    return this.tasksService.create(createTaskDto, account);
  }

  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({
    status: 200,
    description: 'All tasks found successfully',
  })
  @Get()
  @Auth(
    ValidRoles.businessManager,
    ValidRoles.areaManager,
    ValidRoles.areaLeader,
    ValidRoles.technician,
  )
  findAll(@GetAccount() account: Account) {
    return this.tasksService.findByUser(account);
  }

  @ApiOperation({ summary: 'Get a task by id' })
  @ApiResponse({
    status: 200,
    description: 'Task found successfully',
  })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.tasksService.findSubtasks(id);
  }

  @ApiOperation({ summary: 'Update a task' })
  @ApiResponse({
    status: 200,
    description: 'Task updated successfully',
  })
  @Patch(':id')
  @Auth(
    ValidRoles.businessManager,
    ValidRoles.areaManager,
    ValidRoles.areaLeader,
    ValidRoles.technician,
  )
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @GetAccount() account: Account,
  ) {
    return this.tasksService.update(id, updateTaskDto, account);
  }

  @ApiOperation({ summary: 'Remove a task' })
  @ApiResponse({
    status: 200,
    description: 'Task removed successfully',
  })
  @Delete(':id')
  @Auth(
    ValidRoles.businessManager,
    ValidRoles.areaManager,
    ValidRoles.areaLeader,
    ValidRoles.technician,
  )
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.tasksService.remove(id);
  }
}
