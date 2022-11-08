/* eslint-disable prettier/prettier */
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Student {

  @Field()
  @PrimaryGeneratedColumn()
  id:number

  @Field()
  @Column()
  first_name:string

  @Field()
  @Column()
  last_name:string

  @Field({nullable:true})
  @Column({ nullable:true })
  date_of_birth:string

  @Field()
  @Column()
  email:string

  @Field(()=>Int)
  @Column()
  age:number
}
