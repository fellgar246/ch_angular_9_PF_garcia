import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { CourseFormDialogComponent } from './components/course-form-dialog/course-form-dialog.component';
import { CoursesTableComponent } from './components/courses-table/courses-table.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';

@NgModule({
  declarations: [
    CoursesComponent,
    CourseFormDialogComponent,
    CoursesTableComponent,
    CourseDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    CoursesRoutingModule,
  ],
  exports: [
    CoursesComponent
  ]
})
export class CoursesModule { }
