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
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ValidRoles } from '../auth/interfaces/roles.interface';
import { Auth, GetAccount } from '../auth/decorators';
import { Account } from '../auth/entities/account.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

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

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.tasksService.findSubtasks(id);
  }

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

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.tasksService.remove(id);
  }
}
