import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';

@Entity()
export class State {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('int')
  sequence: number;

  @OneToMany(() => Task, (task) => task.state)
  tasks: Task[];
}
