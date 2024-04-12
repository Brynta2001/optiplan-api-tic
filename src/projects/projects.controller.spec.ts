import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { Project } from './entities/project.entity';
import { mockProjectRepository } from '../../test/utils';

describe('ProjectsController', () => {
  let projectsController: ProjectsController;

  const projectRepositoryToken = getRepositoryToken(Project);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [
        ProjectsService,
        {
          provide: projectRepositoryToken,
          useValue: mockProjectRepository,
        },
      ],
    }).compile();

    projectsController = module.get<ProjectsController>(ProjectsController);
  });

  it('should be defined', () => {
    expect(projectsController).toBeDefined();
  });

  // it('TEST-5 should create a project only for users with the business manager role', async () => {
  //   await projectsController.create(mockCreateProjectDto, mockAccounts[0]);
  //   expect(projectsController.create).toBeDefined();
  // });
});
