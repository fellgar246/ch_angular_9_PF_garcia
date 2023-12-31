import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EnrollFormDialogComponent } from './components/enroll-form-dialog/enroll-form-dialog.component';
import { Enroll, EnrollWithStudentAndCourse } from './models';
import { EnrollService } from './enroll.service';
import { NotifierService } from '../../../core/services/notifier.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsAdmin } from 'src/app/store/auth/auth.selectors';
import { EnrollActions } from './store/enroll.actions';
import { selectErollments } from './store/enroll.selectors';

@Component({
  selector: 'app-enroll',
  templateUrl: './enroll.component.html',
  styleUrls: ['./enroll.component.scss']
})
export class EnrollComponent {
  public enrollments: Observable<EnrollWithStudentAndCourse[]>;
  public isLoading$: Observable<boolean>;
  public isAdmin$: Observable<boolean>;

  constructor(
    private matDialog: MatDialog,
    private enrollService: EnrollService,
    private notifier: NotifierService,
    private store: Store
    ) {
      this.isLoading$ = this.enrollService.isLoading$;
      this.enrollments = this.store.select(selectErollments)
      this.isAdmin$ = this.store.select(selectIsAdmin);
    }

  ngOnInit(): void {
    this.store.dispatch(EnrollActions.loadEnrolls())
  }

  onCreateEnrollment(): void {
    this.matDialog.open(EnrollFormDialogComponent),  {
          width: '400px',
        };
  }

  onDeleteEnrollment(enrollToDelete: Enroll): void {
    if(confirm(`¿Está seguro de eliminar la inscripción del estudiante ${enrollToDelete.studentId}?`)){
      this.enrollService.deleteCourseById(enrollToDelete.id);
      this.store.dispatch(EnrollActions.loadEnrolls())
      this.notifier.showSuccess('Inscripción Eliminada', 'La inscripción se eliminó correctamente');
    }
  }

}
