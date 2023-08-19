import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Enroll } from '../../models';
import { Store } from '@ngrx/store';
import { EnrollActions } from '../../store/enroll.actions';
import { Observable } from 'rxjs';
import { selectUserOptions, selectCourseOptions } from '../../store/enroll.selectors';
import { User } from '../../../users/models';
import { Course } from '../../../courses/models';

@Component({
  selector: 'app-enroll-form-dialog',
  templateUrl: './enroll-form-dialog.component.html',
  styleUrls: ['./enroll-form-dialog.component.scss']
})
export class EnrollFormDialogComponent {

  userOptions$: Observable<User[]>;
  courseOptions$: Observable<Course[]>;

  editingEnrollment?: Enroll;

  courseIdControl = new FormControl<number | null>(null, [Validators.required]);
  userIdControl = new FormControl<number | null>(null, [Validators.required]);

  enrollForm = new FormGroup({
    courseId: this.courseIdControl,
    userId: this.userIdControl,
  });


  constructor(
    private dialogRef: MatDialogRef<EnrollFormDialogComponent>,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data?: Enroll,
  ) {
    this.userOptions$ = this.store.select(selectUserOptions)
    this.courseOptions$ = this.store.select(selectCourseOptions)
    if(this.data){
      this.editingEnrollment = this.data;
      this.courseIdControl.setValue(this.data.courseId);
      this.userIdControl.setValue(this.data.userId);
    }
  }

  ngOnInit(): void {
    this.store.dispatch(EnrollActions.loadCourseOptions());
    this.store.dispatch(EnrollActions.loadUserOptions())
  }

  onSubmit(): void {
    if(this.enrollForm.invalid) {
      this.enrollForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.enrollForm.value);
      this.store.dispatch(EnrollActions.createEnrollment({ payload: this.enrollForm.getRawValue()}))
    }
  }
}
