/* eslint-disable prettier/prettier */
import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateStudentInput {

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
