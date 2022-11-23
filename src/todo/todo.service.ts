import {
  Injectable,
  InternalServerErrorException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TodoEntity, TodoStatus } from '../Entity/todo.entity';
import { UpdateTodoDto } from '../DTO/update-todo.dto';
import { CreateTodoDto } from '../DTO/create-todo.dto';
import { UserEntity } from '../Entity/user.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity) private collection: Repository<TodoEntity>,
  ) {}

  async getAllTodos(user: UserEntity) {
    try {
      return await this.collection
        .createQueryBuilder('todo')
        .where(`todo.userId = :userId`, { userId: user.id })
        .getMany();
    } catch (err) {
      throw new InternalServerErrorException(err?.message);
    }
  }

  async createATodo(CreateTodoDto: CreateTodoDto, user: UserEntity) {
    const { description, title } = CreateTodoDto;
    const todo = new TodoEntity();
    todo.title = title;
    todo.description = description;
    todo.status = TodoStatus.OPEN;
    todo.userId = user.id;
    return await this.collection.save(todo);
  }

  async updateTodo(updateTodoDTO: UpdateTodoDto, id) {
    const { description, title } = updateTodoDTO;
    await this.collection.update({ id }, { description, title });
    return this.collection.findOneBy({ id });
  }
}
