/* eslint-disable prettier/prettier */


import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { AppGateway } from 'src/app.gateway';
import { StudentService } from 'src/student/student.service';


@Processor('excelread')
export class ExcelReadConsumer{
    constructor(private studentService: StudentService,private appgateway:AppGateway){}
    
    @Process('excelreadjob')
    async excelread(job:Job<any>){
       
        let dataset= await this.studentService.readStudentFile(job.data.filename)
        console.log("Update completed")
        this.appgateway.handleMessage("Update Completed")
    
       return "job completed"
    }
}