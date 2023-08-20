import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Enroll } from '../../models';
import { Store } from '@ngrx/store';
import { EnrollActions } from '../../store/enroll.actions';
import { Observable } from 'rxjs';
import { selectStudentOptions, selectCourseOptions } from '../../store/enroll.selectors';
import { Course } from '../../../courses/models';
import { Student } from '../../../students/models';

@Component({
  selector: 'app-enroll-form-dialog',
  templateUrl: './enroll-form-dialog.component.html',
  styleUrls: ['./enroll-form-dialog.component.scss']
})
export class EnrollFormDialogComponent {

  studentOptions$: Observable<Student[]>;
  courseOptions$: Observable<Course[]>;

  editingEnrollment?: Enroll;

  courseIdControl = new FormControl<number | null>(null, [Validators.required]);
  studentIdControl = new FormControl<number | null>(null, [Validators.required]);

  enrollForm = new FormGroup({
    courseId: this.courseIdControl,
    studentId: this.studentIdControl,
  });


  constructor(
    private dialogRef: MatDialogRef<EnrollFormDialogComponent>,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data?: Enroll,
  ) {
    this.studentOptions$ = this.store.select(selectStudentOptions)
    this.courseOptions$ = this.store.select(selectCourseOptions)
    if(this.data){
      this.editingEnrollment = this.data;
      this.courseIdControl.setValue(this.data.courseId);
      this.studentIdControl.setValue(this.data.studentId);
    }
  }

  ngOnInit(): void {
    this.store.dispatch(EnrollActions.loadCourseOptions());
    this.store.dispatch(EnrollActions.loadStudentOptions())
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
