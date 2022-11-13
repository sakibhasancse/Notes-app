import { Injectable } from '@nestjs/common';

const users = [{
  name:"Sakib",
  id:33
},
  {
    name:"Joy",
    id:2
  },
  {
    name:"Rakib",
    id:33
  }]

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getUsers(): Array<Object> {
    return users
  }
  getProfile(request):Object {
    const {body, params, query, ip, headers, session} = request
      console.log({body, params, query, ip, headers, session})
    return {
      name:"Sakib",
      id:33
    }
  }
}
