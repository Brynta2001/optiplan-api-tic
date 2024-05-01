import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from './projects.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { mockProjectRepository } from '../../test/utils/mocks';

describe('ProjectsService', () => {
  let projectService: ProjectsService;

  const projectRepositoryToken = getRepositoryToken(Project);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        {
          provide: projectRepositoryToken,
          useValue: mockProjectRepository,
        },
      ],
    }).compile();

    projectService = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(projectService).toBeDefined();
  });
});
