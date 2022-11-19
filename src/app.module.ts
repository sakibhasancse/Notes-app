import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";


import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AppMiddleware } from "./app.middleware";
import { TodoModule } from './todo/todo.module';
import { AuthModule } from "./auth/auth.module";

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
  imports: [TodoModule, AuthModule, TypeOrmModule.forRoot(typeOrmOptions)],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(AppMiddleware).forRoutes({path:'/', method:RequestMethod.GET})
  }
}
