import { Board } from "src/boards/entities/board.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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
}
