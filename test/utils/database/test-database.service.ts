import { Project } from '../../../src/projects/entities/project.entity';
import { DataSource } from 'typeorm';

export const testDatasetSeed = async () => {
  const dataSource = new DataSource({
    type: 'better-sqlite3',
    database: ':memory:',
    entities: [Project],
    synchronize: true,
    dropSchema: true,
  });

  await dataSource.initialize();

  const entityManager = dataSource.createEntityManager();

  entityManager.create;
};
