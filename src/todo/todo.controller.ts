import { Body, Controller, Get, Post } from "@nestjs/common";
import { TodoService } from "./todo.service";

@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {

  }

  @Get()
  getAllTodos(){
    return this.todoService.getAllTodos()
  }

  @Post()
  createATodo(@Body() data){
    const {title, description} = data
    return this.todoService.createATodo(title, description)
  }
}
