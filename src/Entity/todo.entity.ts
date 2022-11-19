import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum TodoStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}

@Entity('todos')
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: String;
  @Column()
  description: String;
  @Column()
  status: TodoStatus;
}