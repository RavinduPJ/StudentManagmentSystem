import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { TextBoxComponent } from "@progress/kendo-angular-inputs";
import {GraphqlService} from '../graphql.service'

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
  studentdata:any

  constructor(private graphqlService:GraphqlService) { }
  public form: FormGroup = new FormGroup({
    id: new FormControl(),
    firstname: new FormControl(),
    lastname: new FormControl(),
    email:new FormControl(),
    dateofbirth:new FormControl(),
    age:new FormControl()
    });

  ngOnInit(): void {
    console.log("data read")
 
    // this.graphqlService.getAllStudents({take:2,skip:0})
    // .subscribe(data => this.studentdata=data.data.allstudents);

    // this.graphqlService.getStudent(75)
    // .subscribe(data => this.studentdata=data.data.student);

    // this.graphqlService.deleteStudent(76)
    // .subscribe(data => console.log(data));
  }

}
