import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentDetailComponent } from './pages/student-detail/student-detail.component';
import { RouterModule } from '@angular/router';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentFormDialogComponent } from './components/student-form-dialog/student-form-dialog.component';
import { StudentsTableComponent } from './components/students-table/students-table.component';
import { StudentsComponent } from './students.component';


@NgModule({
  declarations: [
    StudentsComponent,
    StudentDetailComponent,
    StudentFormDialogComponent,
    StudentsTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    StudentsRoutingModule
  ],
  exports: [
    StudentsComponent
  ]
})
export class StudentsModule { }
