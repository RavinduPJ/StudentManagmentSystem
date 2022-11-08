/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagequeueService } from './messagequeue/messagequeue.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,private messagequeService:MessagequeueService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

      @Get('readstudentdetails')
       readStudentDetails(){
       console.log("request came")
       return this.messagequeService.excelreadprocess()
    }
}
