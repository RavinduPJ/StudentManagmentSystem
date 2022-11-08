/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class MessagequeueService {
    constructor(@InjectQueue('excelread') private excelreadQueue: Queue){}

    async excelreadprocess(){
          const job = await this.excelreadQueue.add('excelreadjob', {
            filename: "./Dataset/StudentDetails.xlsx",
          },{delay:5000});

     return job
    }
}
