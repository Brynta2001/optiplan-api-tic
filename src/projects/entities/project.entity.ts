import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Account } from '../../auth/entities/account.entity';
import { Content } from '../../common/entities/content.entity';
import { State } from '../../states/entities/state.entity';
import { Task } from '../../tasks/entities/task.entity';

@Entity()
export class Project extends Content {
  @Column('text')
  code: string;

  @Column('int')
  priorityOrder: number;

  @ManyToOne(() => Account, (account) => account.projects, { eager: true })
  createdBy: Account;

  @OneToMany(() => State, (state) => state.project, { eager: true })
  states: State[];

  @OneToMany(() => Task, (task) => task.project, { eager: true })
  tasks: Task[];
}
