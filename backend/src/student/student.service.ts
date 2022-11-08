/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
import { Dependencies, Injectable } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ExcelDateToJSDate,calculate_age } from 'src/Tools/DateFunctions';
import { AOA } from 'src/Tools/Enums/Enums';
import { readFileAsync } from 'src/Tools/ReadExcelFile';
import { Like, OptimisticLockCanNotBeUsedError } from 'typeorm';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { Student } from './entities/student.entity';
import { StudentCount } from './entities/studentcount';

@Injectable()
@Dependencies(getRepositoryToken(Student))
export class StudentService {
  studentdetailsRepository: any;

  constructor(studentdetailsRepository: any) {
      this.studentdetailsRepository = studentdetailsRepository
  }


 async create(createStudentInput: CreateStudentInput) {
    const student=this.studentdetailsRepository.create(createStudentInput)
    return  this.studentdetailsRepository.save(student)
  }

 async findAll(options:{take:number,skip:number,searchkey:string}):Promise<StudentCount> {
  const count=await this.studentdetailsRepository.count()
    console.log("count",count)
    console.log(options)
    return {total:await this.studentdetailsRepository.count(),data: this.studentdetailsRepository.find(
      {take:options.take,
       skip:options.skip,
       order: { id:'ASC'},
       where: [{first_name: Like(`${options.searchkey}%`)},{last_name: Like(`${options.searchkey}%`)}]
    }
      )}

  }

 async getTotal(){
    const count=await this.studentdetailsRepository.count()
    console.log(count)
 }

 async findOne(id: number):Promise<Student> {
    return this.studentdetailsRepository.findOne({ where: { id } })
  }

async updateStudent(id:number, updateStudentInput: UpdateStudentInput):Promise<Student> {
      let student:Student=this.studentdetailsRepository.create(updateStudentInput)
      student.id=id
      console.log(updateStudentInput)
      return this.studentdetailsRepository.save(student)
  }

  async remove(id: number){
    const student:Student=await this.studentdetailsRepository.findOne({ where: { id } })
   
    if (student){
      await this.studentdetailsRepository.remove(student)
    }
    
    let returnstudent:Student=await this.studentdetailsRepository.create({
      id:id,
      first_name:"",
      last_name:"",
      date_of_birth:"",
      email:"",
      age:0
    })
    returnstudent.id=id

    return returnstudent
  }

  async readStudentFile(filename: any) {

    let output: any = await readFileAsync(AOA.AOO, filename, "Sheet1", 0)
    let students: Student[] = []
    output.forEach((line: any) => {
      const startdate:Date=ExcelDateToJSDate(line["Date_of_birth"])
      
      const age:any=calculate_age(startdate)
        let student: Student = this.studentdetailsRepository.create({ first_name: line["First_Name"], last_name: line["Last_Name"], date_of_birth: ExcelDateToJSDate(line["Date_of_birth"]).toLocaleDateString(), email: line["Email"], age: age })
        students.push(student)
    });

    return this.studentdetailsRepository.save(students, { chunk: 20 })
}
}
