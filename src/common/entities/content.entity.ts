import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class Content {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @Column('text', {
    nullable: true,
  })
  description?: string;
}
