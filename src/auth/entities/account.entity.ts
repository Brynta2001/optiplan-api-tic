import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Role } from "./role.entity";
import { Task } from "../../tasks/entities/task.entity";
import { Project } from "../../projects/entities/project.entity";

@Entity('accounts')
export class Account {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(
        () => User,
        (user) => user.account,
        { eager: true }
    )
    user: User;

    @ManyToOne(
        () => Role,
        (role) => role.account,
        { eager: true }
    )
    role: Role;

    @OneToMany(
        () => Project,
        (project) => project.createdBy,
        {  },
    )
    projects: Project[];

    @OneToMany(
        () => Task,
        (task) => task.createdBy,
    )
    createdTasks: Task[];

    @OneToMany(
        () => Task,
        (task) => task.assignedTo,
    )
    assignedTasks: Task[];
}