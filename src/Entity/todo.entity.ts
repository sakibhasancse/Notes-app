import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { User } from "../auth/auth.decorator";

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

  @ManyToOne(()=> UserEntity, (user)=> user.todos)
  user: UserEntity
}