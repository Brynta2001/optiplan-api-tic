import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Role } from "./role.entity";
import { Task } from "src/tasks/entities/task.entity";

@Entity('accounts')
export class Account {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(
        () => User,
        (user) => user.account,
        {}
    )
    user: User;

    @ManyToOne(
        () => Role,
        (role) => role.account,
        {eager: true}
    )
    role: Role;

    /*@OneToMany(
        () => Task,
        (task) => task.createdBy
    )
    createdTask: Task;

    @OneToMany(
        () => Task,
        (task) => task.assignedTo
    )
    assignedTask: Task;*/
}