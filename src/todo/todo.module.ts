import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { TodoEntity } from "../Entity/todo.entity";
import { TodoService } from "./todo.service";
import { TodoController } from "./todo.controller";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports:[
    TypeOrmModule.forFeature([TodoEntity]), AuthModule
  ],
  controllers: [TodoController],
  providers: [TodoService]
})
export class TodoModule {}
