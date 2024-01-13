import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "../../tasks/entities/task.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true
    })
    email: string;

    @Column('text', {
        select: false,
    })
    password: string;

    @Column('text')
    fullName: string;

    @Column('text', {
        array: true,
        default: ['technician']
    })
    roles: string[];

    @Column('text')
    department: string;

    @OneToMany(
        () => Task,
        (task) => task.assignedTo
    )
    task: Task;

    @BeforeInsert()
    checkFieldsBeforeInsert(){
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate(){
        this.checkFieldsBeforeInsert();
    }
}
