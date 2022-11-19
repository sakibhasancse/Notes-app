import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { TodoEntity, TodoStatus } from "../Entity/todo.entity";
import { UpdateTodoDto } from "../DTO/update-todo.dto";
import { CreateTodoDto } from "../DTO/create-todo.dto";

@Injectable()
export class TodoService {
  constructor(@InjectRepository(TodoEntity) private collection: Repository<TodoEntity>) {
  }


  async getAllTodos() {
    return await this.collection.find();
  }

  async createATodo(CreateTodoDto: CreateTodoDto) {
    const {description, title} = CreateTodoDto
    const todo = new TodoEntity()
    todo.title = title
    todo.description = description
    todo.status = TodoStatus.OPEN
    return await this.collection.save(todo)
  }

  async updateTodo(updateTodoDTO: UpdateTodoDto, id){
    const {description, title} = updateTodoDTO
    await this.collection.update({id}, {description, title});
    return this.collection.findOneBy({ id })
  }
}
