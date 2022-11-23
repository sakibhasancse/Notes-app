import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TodoEntity } from './todo.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => TodoEntity, (todo) => todo.user)
  todos: TodoEntity[];
}
