import { Body, Controller, Get, Param, Post, Put, ValidationPipe } from "@nestjs/common";

import { TodoService } from "./todo.service";
import { CreateTodoDto } from "../DTO/create-todo.dto";
import { UpdateTodoDto } from "../DTO/update-todo.dto";

@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  getAllTodos(){
    return this.todoService.getAllTodos()
  }

  @Post()
  createATodo(@Body(ValidationPipe) data: CreateTodoDto){
    return this.todoService.createATodo(data)
  }

  @Put(':id')
  updateTodo(@Body(ValidationPipe) data: UpdateTodoDto, @Param('id') id:number){
    return this.todoService.updateTodo(data, id)
  }
}
