/* eslint-disable prettier/prettier */
import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class Options {
    @Field(()=>Int)
    take:number

    @Field(()=>Int)
    skip:number

    @Field()
    searchkey:string
}
