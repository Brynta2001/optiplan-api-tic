import { Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn, TableInheritance, Tree, TreeChildren, TreeParent } from "typeorm";
import { Stage } from "../../stages/entities/stage.entity";
import { User } from "../../auth/entities/user.entity";

@Entity()
@Tree("closure-table")
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    title: string;

    @Column('text', {
        nullable: true
    })
    description?: string;

    // It allows to search when a user enter using different roles
    @Column('int')
    level: number;

    @ManyToOne(
        () => User,
        (user) => user.createdTask,
        {eager: true}
    )
    createdBy: User;

    @ManyToOne(
        () => User,
        (user) => user.assignedTask,
        {eager: true, nullable: true}
    )
    assignedTo: User;

    @TreeParent()
    parentTask: Task;

    @TreeChildren()
    subTasks: Task[];
    
    @ManyToOne(
        () => Stage,
        (stage) => stage.task,
        {onDelete: 'CASCADE', eager: true, nullable: true}
    )
    stage?: Stage;
}
