import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { StudentgridComponent } from './studentgrid/studentgrid.component';

const routes: Routes = [
  {path: 'student_details', component: StudentgridComponent},
  {path: 'update', component: StudentEditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
