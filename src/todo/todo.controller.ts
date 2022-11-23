import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { TodoService } from './todo.service';
import { CreateTodoDto } from '../DTO/create-todo.dto';
import { UpdateTodoDto } from '../DTO/update-todo.dto';
import { User } from '../auth/auth.decorator';
import { UserEntity } from '../Entity/user.entity';

@Controller('todos')
@UseGuards(AuthGuard())
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  getAllTodos(@User() user: UserEntity) {
    return this.todoService.getAllTodos(user);
  }

  @Post()
  createATodo(
    @Body(ValidationPipe) data: CreateTodoDto,
    @User() user: UserEntity,
  ) {
    return this.todoService.createATodo(data, user);
  }

  @Put(':id')
  updateTodo(
    @Body(ValidationPipe) data: UpdateTodoDto,
    @Param('id') id: number,
  ) {
    return this.todoService.updateTodo(data, id);
  }
}
