import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Stage } from "../../stages/entities/stage.entity";

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
        {cascade: true, nullable: true}
    )
    stages: Stage [];
}
