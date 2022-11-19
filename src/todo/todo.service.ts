import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TodoEntity, TodoStatus } from "../Entity/todo.entity";
import { Repository } from "typeorm";

@Injectable()
export class TodoService {
  constructor(@InjectRepository(TodoEntity) private collection: Repository<TodoEntity>) {
  }


  async getAllTodos() {
    return await this.collection.find();
  }

  async createATodo(title: string, description: string) {
    const todo = new TodoEntity()
    todo.title = title
    todo.description = description
    todo.status = TodoStatus.OPEN
     await this.collection.create(todo);
    return await this.collection.save(todo)
  }
}
