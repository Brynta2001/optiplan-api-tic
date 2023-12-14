import { Stage } from "src/stages/entities/stage.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Board {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    @Column('text', {
        nullable: true,
    })
    description: string;

    @OneToMany(
        () => Stage,
        (stage) => stage.board,
        {cascade: true}
    )
    stage: Stage [];
}
