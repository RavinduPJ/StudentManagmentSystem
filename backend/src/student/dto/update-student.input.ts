/* eslint-disable prettier/prettier */
import { CreateStudentInput } from './create-student.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateStudentInput extends PartialType(CreateStudentInput) {

  @Field(()=>Int)
  id:number

  @Field()
  first_name:string

  @Field()
  last_name:string

  @Field({nullable:true})
  date_of_birth:string

  @Field()
  email:string

  @Field(()=>Int)
  age:number
}
