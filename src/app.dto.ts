import {ApiProperty} from '@nestjs/swagger'
import { IsUUID } from "class-validator";


export class GetProfileByIdParam {
  @ApiProperty({description: '', required: true })
  @IsUUID()
  readonly id!:String
}