import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from "@angular/common";
import { AppComponent } from './app.component';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationModule } from '@progress/kendo-angular-navigation';
import { IndicatorsModule } from "@progress/kendo-angular-indicators";
import { IconsModule } from "@progress/kendo-angular-icons";
import { UploadsModule } from "@progress/kendo-angular-upload";

import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { StudentEditComponent } from './student-edit/student-edit.component';
import { NavbarComponent } from './navbar/navbar.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { HttpClientModule } from '@angular/common/http';
import { GraphqlService } from './graphql.service';
import { StudentgridComponent } from './studentgrid/studentgrid.component';
import {  GridModule, PDFModule,  ExcelModule } from '@progress/kendo-angular-grid';
import { WebsocketService } from './websocket.service';
import { StudentDetailsService } from './studentgrid/studentgrid.service';
import {  NotificationModule } from "@progress/kendo-angular-notification";
import { RouterModule } from '@angular/router';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { StoreModule } from '@ngrx/store';
import { studentReducer } from './State/student.reduce';

@NgModule({
  declarations: [
    AppComponent,
    StudentEditComponent,
    NavbarComponent,
    StudentgridComponent,
    FileuploadComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    LayoutModule,
    IndicatorsModule,
    IconsModule,
    NavigationModule,
    ButtonsModule,
    InputsModule,
    LabelModule,
    ReactiveFormsModule,
    DateInputsModule,
    HttpClientModule,
    GridModule,
    PDFModule,
    ExcelModule,
    UploadsModule,
    NotificationModule,
    RouterModule.forRoot([
      {path: 'studentdetails', component: StudentgridComponent},
      {path: 'fileupload', component: FileuploadComponent},
    ]),
    StoreModule.forRoot({ student: studentReducer }),
  ],
  providers:[GraphqlService,WebsocketService,StudentDetailsService],
  bootstrap: [AppComponent],
})
export class AppModule { }
