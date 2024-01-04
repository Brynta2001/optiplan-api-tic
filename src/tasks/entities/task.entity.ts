import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Stage } from "../../stages/entities/stage.entity";
import { User } from "src/auth/entities/user.entity";

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

    @ManyToOne(
        () => Stage,
        (stage) => stage.task,
        {onDelete: 'CASCADE', eager: true}
    )
    stage: Stage;

    @ManyToOne(
        () => User,
        (user) => user.task,
        {eager: true, nullable: true}
    )
    assignedTo: User;
}
