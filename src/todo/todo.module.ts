import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { TodoEntity } from "../Entity/todo.entity";

@Module({
  imports:[
    TypeOrmModule.forFeature([TodoEntity])
  ]
})
export class TodoModule {}
