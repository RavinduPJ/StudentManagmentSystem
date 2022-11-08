/* eslint-disable prettier/prettier */
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from './student.entity';

@ObjectType()

export class StudentCount {

  @Field()
  total:number

  @Field(()=>[Student])
  data:Student[]
}