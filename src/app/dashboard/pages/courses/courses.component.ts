import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CourseFormDialogComponent } from './components/course-form-dialog/course-form-dialog.component';
import { Course } from './models';
import { CourseService } from './course.service';
import { NotifierService } from '../../../core/services/notifier.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsAdmin } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  public courses: Observable<Course[]>;
  public isLoading$: Observable<boolean>;
  public isAdmin$: Observable<boolean>;

  constructor(
    private matDialog: MatDialog,
    private courseService: CourseService,
    private notifier: NotifierService,
    private store: Store
    ) {
      this.courseService.loadCourses();
      this.isLoading$ = this.courseService.isLoading$;
      this.courses = this.courseService.getCourses();
      this.isAdmin$ = this.store.select(selectIsAdmin);
    }

  onCreateCourse(): void {
    this.matDialog
      .open(CourseFormDialogComponent, {
        width: '400px',
      })
      .afterClosed()
      .subscribe({
        next: (value) => {
          if(value){
            this.courseService.createCourse(value);
            this.notifier.showSuccess('Cursos cargados', 'Los cursos se cargaron correctamente');
          }else {
            console.log('No recibimos nada');
          }
        }
      })
  }

  onDeleteCourse(courseToDelete: Course): void {
    if(confirm(`¿Está seguro de eliminar al curso ${courseToDelete.nameCourse}?`)){
      this.courseService.deleteCourseById(courseToDelete.id);
      this.notifier.showSuccess('Curso eliminado', 'El curso se eliminó correctamente');
    }
  }

  onEditCourse(courseToEdit: Course): void {
    this.matDialog
    .open(CourseFormDialogComponent, {
      data: courseToEdit,
    })
    .afterClosed()
    .subscribe({
      next: (courseUpdated) => {
        if(courseUpdated){
          this.courseService.updateCourseById(courseToEdit.id,courseUpdated);
          this.notifier.showSuccess('Curso actualizado', 'El curso se actualizó correctamente');
        }
      }
    })
  }



}
