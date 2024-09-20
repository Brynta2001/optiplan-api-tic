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

  @Column('date', {
    nullable: true,
  })
  startDate: Date;

  @Column('date', {
    nullable: true,
  })
  endDate: Date;
}
