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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Account } from '../auth/entities/account.entity';
import { Auth, GetAccount } from '../auth/decorators';

@ApiTags('Projects')
@ApiBearerAuth()
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @Auth()
  create(
    @Body() createProjectDto: CreateProjectDto,
    @GetAccount() account: Account,
  ) {
    return this.projectsService.create(createProjectDto, account);
  }

  @Get()
  @Auth()
  findAll(@GetAccount() account: Account) {
    return this.projectsService.findAll(account);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectsService.findOne(id);
  }

  @Get(':id/tasks')
  findTasks(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectsService.findTasks(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectsService.remove(id);
  }
}
