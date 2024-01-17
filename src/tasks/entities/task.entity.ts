import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, TableInheritance } from "typeorm";
import { Stage } from "../../stages/entities/stage.entity";
import { User } from "../../auth/entities/user.entity";

@Entity()
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
    assignedTo?: User;

    @ManyToOne(
        () => Task,
        (task) => task.subTasks,
        {eager: true, nullable: true}
    )
    parentTask?: Task;

    @OneToMany(
        () => Task,
        (task) => task.parentTask,
        {nullable: true}
    )
    subTasks: Task[];
    
    @ManyToOne(
        () => Stage,
        (stage) => stage.task,
        {onDelete: 'CASCADE', eager: true, nullable: true}
    )
    stage?: Stage;
}
