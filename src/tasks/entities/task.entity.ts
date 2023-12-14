import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Stage } from "src/stages/entities/stage.entity";

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
}
