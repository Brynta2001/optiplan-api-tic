import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
