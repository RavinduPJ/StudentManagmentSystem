/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import {TypeOrmModule} from "@nestjs/typeorm"
import { BullModule } from '@nestjs/bull';

import { MessagequeueService } from './messagequeue/messagequeue.service';
import { ExcelReadConsumer } from './messagequeue/messagequeue.consumer';

import { AppGateway } from './app.gateway';
import { StudentModule } from './student/student.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/graphql-schema.gql'),
      driver: ApolloDriver,
    }),
    TypeOrmModule.forRoot({
    type:"postgres",
    host:"localhost",
    username:"postgres",
    password:"RAvipraBa0104*",
    database:"TecStack_Exercise",
    autoLoadEntities:true ,
    synchronize: true,
    entities:[StudentModule]

  }),
  BullModule.forRoot({
    redis: {
      host: 'localhost',
      port: 6379,
    },
  }),
  BullModule.registerQueue({
    name: 'excelread',
  }),

  StudentModule],
  controllers: [AppController],
  providers: [AppService,MessagequeueService, ExcelReadConsumer, AppGateway],
})
export class AppModule {}
