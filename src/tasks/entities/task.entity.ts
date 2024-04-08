import { Entity, ManyToOne, Tree, TreeChildren, TreeParent } from 'typeorm';
import { Content } from '../../common/entities/content.entity';
import { Account } from '../../auth/entities/account.entity';
import { State } from '../../states/entities/state.entity';
import { Project } from '../../projects/entities/project.entity';

@Entity()
@Tree('closure-table')
export class Task extends Content {
  @ManyToOne(() => Project, (project) => project.tasks, {})
  project: Project;

  @ManyToOne(() => State, (state) => state.tasks, { eager: true })
  state: State;

  @ManyToOne(() => Account, (account) => account.createdTasks, { eager: true })
  createdBy: Account;

  @ManyToOne(() => Account, (account) => account.assignedTasks, { eager: true })
  assignedTo: Account;

  @TreeParent()
  parentTask?: Task;

  @TreeChildren()
  subTasks?: Task[];
}
