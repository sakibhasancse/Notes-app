import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AppMiddleware } from "./app.middleware";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { TodoService } from './todo/todo.service';
import { TodoController } from './todo/todo.controller';
import { TodoModule } from './todo/todo.module';

const typeOrmOptions: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '12345',
  database: 'todo',
  autoLoadEntities: true,
  synchronize: true
}


@Module({
  imports: [TypeOrmModule.forRoot(typeOrmOptions), TodoModule, ],
  controllers: [AppController, TodoController],
  providers: [AppService, TodoService],
})

export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(AppMiddleware).forRoutes({path:'/', method:RequestMethod.GET})
  }
}
