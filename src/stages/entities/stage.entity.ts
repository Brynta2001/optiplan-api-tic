import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Board } from "src/boards/entities/board.entity";
import { Task } from "src/tasks/entities/task.entity";

@Entity()
export class Stage {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    @ManyToOne(
        () => Board,
        (board) => board.stage,
        {onDelete: 'CASCADE', eager: true}
    )
    board: Board;

    @OneToMany(
        () => Task,
        (task) => task.stage,
        {cascade: true}
    )
    task: Task;
}
