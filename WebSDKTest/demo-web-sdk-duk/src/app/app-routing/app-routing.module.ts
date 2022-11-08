import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FirstTabComponent } from '../components/first-tab/first-tab.component';
import { SecondTabComponent } from '../components/second-tab/second-tab.component';
import { ThirdTabComponent } from '../components/third-tab/third-tab.component';
const routes: Routes = [
   {
      path: '',
      component: FirstTabComponent,
   },
   {
      path: 'second',
      component: SecondTabComponent,
   },
   {
      path: 'third',
      component: ThirdTabComponent,
   }
];

@NgModule({
   declarations: [],
   imports: [
      CommonModule,
      RouterModule.forRoot(routes)
   ],
   exports: [RouterModule]
})
export class AppRoutingModule { }
