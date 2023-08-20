import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentFormDialogComponent } from './components/student-form-dialog/student-form-dialog.component';
import { Student } from './models';
import { StudentService } from './student.service';
import { NotifierService } from '../../../core/services/notifier.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsAdmin } from 'src/app/store/auth/auth.selectors';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent {
  public students: Observable<Student[]>;
  public isLoading$: Observable<boolean>;
  public isAdmin$: Observable<boolean>;

  constructor(
    private matDialog: MatDialog,
    private studentService: StudentService,
    private notifier: NotifierService,
    private store: Store
    ) {
      this.studentService.loadStudents();
      this.isLoading$ = this.studentService.isLoading$;
      this.isAdmin$ = this.store.select(selectIsAdmin);
      this.students = this.studentService.getStudents();
    }

  onCreateStudents(): void {
    this.matDialog
      .open(StudentFormDialogComponent, {
        width: '400px',
      })
      .afterClosed()
      .subscribe({
        next: (value) => {
          if(value){
            this.studentService.createStudent(value);
            this.notifier.showSuccess('Estudiantes cargados', 'Los estudiantes se cargaron correctamente');
          }else {
            console.log('No recibimos nada');
          }
        }
      })
  }

  onDeleteStudent(studentToDelete: Student): void {
    if(confirm(`¿Está seguro de eliminar al estudiante ${studentToDelete.name}?`)){
      this.studentService.deleteStudentById(studentToDelete.id);
      this.notifier.showSuccess('Estudiante eliminado', 'El estudiante se eliminó correctamente');
    }
  }

  onEditStudent(studentToEdit: Student): void {
    this.matDialog
    .open(StudentFormDialogComponent, {
      data: studentToEdit,
    })
    .afterClosed()
    .subscribe({
      next: (studentUpdated) => {
        if(studentUpdated){
          this.studentService.updateStudentById(studentToEdit.id,studentUpdated);
          this.notifier.showSuccess('Estudiante actualizado', 'El estudiante se actualizó correctamente');
        }
      }
    })
  }
}
