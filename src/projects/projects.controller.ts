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
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Account } from '../auth/entities/account.entity';
import { Auth, GetAccount } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces/roles.interface';

@ApiTags('Projects')
@ApiBearerAuth()
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @ApiOperation({ summary: 'Create a new project' })
  @ApiCreatedResponse({
    description: 'Project created successfully',
  })
  @Post()
  @Auth(ValidRoles.businessManager)
  create(
    @Body() createProjectDto: CreateProjectDto,
    @GetAccount() account: Account,
  ) {
    return this.projectsService.create(createProjectDto, account);
  }

  @ApiOperation({ summary: 'Get all projects' })
  @ApiResponse({
    status: 200,
    description: 'All projects found successfully',
  })
  @Get()
  @Auth(ValidRoles.businessManager)
  findAll(@GetAccount() account: Account) {
    return this.projectsService.findAll(account);
  }

  @ApiOperation({ summary: 'Get a project by id' })
  @ApiResponse({
    status: 200,
    description: 'Project found successfully',
  })
  @Get(':id')
  @Auth(ValidRoles.businessManager)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectsService.findOne(id);
  }

  @ApiOperation({ summary: 'Get all tasks of a project' })
  @ApiResponse({
    status: 200,
    description: 'All tasks of a project found successfully',
  })
  @Get(':id/tasks')
  @Auth(ValidRoles.businessManager)
  findTasks(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectsService.findTasks(id);
  }

  @ApiOperation({ summary: 'Update a project' })
  @ApiResponse({
    status: 200,
    description: 'Project updated successfully',
  })
  @Patch(':id')
  @Auth(ValidRoles.businessManager)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @ApiOperation({ summary: 'Remove a project' })
  @ApiResponse({
    status: 200,
    description: 'Project removed successfully',
  })
  @Delete(':id')
  @Auth(ValidRoles.businessManager)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectsService.remove(id);
  }
}
