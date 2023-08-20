import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { StudentsComponent } from "./students.component";
import { StudentDetailComponent } from "./pages/user-detail/student-detail.component";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: StudentsComponent,
      },
      {
        path: 'users/:id',
        component: StudentDetailComponent,
      }
    ])
  ],
  exports: [
    RouterModule
  ],
})

export class StudentsRoutingModule { }


