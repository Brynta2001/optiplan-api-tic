import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from '../../projects/entities/project.entity';
import { Task } from '../../tasks/entities/task.entity';

@Entity()
export class State {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('int')
  sequence: number;

  @ManyToOne(() => Project, (project) => project.states)
  project: Project;

  @OneToMany(() => Task, (task) => task.state)
  tasks: Task[];
}
