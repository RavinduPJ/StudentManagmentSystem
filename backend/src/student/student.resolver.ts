/* eslint-disable prettier/prettier */
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { Student } from './entities/student.entity';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { Options } from './dto/options.input';
import { Any } from 'typeorm';
import { StudentCount } from './entities/studentcount';




@Resolver(() => Student)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  
  @Mutation(() => Student)
  createStudent(@Args('createStudentInput') createStudentInput: CreateStudentInput) {
    return this.studentService.create(createStudentInput);
  }

  @Query(() => StudentCount, { name: 'allstudents' })
  findAll(@Args('options') options:Options) {
    return this.studentService.findAll(options);
  }

  @Query(() => Student, { name: 'student' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.studentService.findOne(id);
  }

  @Mutation(() => Student,{name:"updateStudent"})
  updateStudent(@Args('updateStudentInput') updateStudentInput: UpdateStudentInput) {
    return this.studentService.updateStudent(updateStudentInput.id, updateStudentInput);
  }

  @Mutation(() => Student,{name:"removeStudent"})
   async removeStudent(@Args('id', { type: () => Int }) id: number) {
    console.log(id)
    return  this.studentService.remove(id);
  }
}
