import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from '../auth/entities/user.entity';
import { ValidRoles } from 'src/auth/interfaces/roles.interface';
import { Auth, GetAccount } from '../auth/decorators';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  /*@Post()
  @Auth(ValidRoles.businessManager, ValidRoles.areaManager, ValidRoles.areaLeader, ValidRoles.technician)
  create(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User) {
    return this.tasksService.create(createTaskDto, user);
  }*/

  @Get()
  @Auth(ValidRoles.businessManager, ValidRoles.areaManager, ValidRoles.areaLeader, ValidRoles.technician)
  findAll(@GetAccount() user: User) {
    return this.tasksService.findByUser(user);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.tasksService.findSubtasks(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.businessManager, ValidRoles.areaManager, ValidRoles.areaLeader, ValidRoles.technician)
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateTaskDto: UpdateTaskDto) {
    //return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.tasksService.remove(id);
  }
}
