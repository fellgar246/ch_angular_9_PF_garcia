import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../../models';

@Component({
  selector: 'app-course-form-dialog',
  templateUrl: './course-form-dialog.component.html',
  styleUrls: ['./course-form-dialog.component.scss']
})
export class CourseFormDialogComponent {

  editingCourse?: Course;

  nameCourseControl = new FormControl<string | null>(null, [Validators.required, Validators.minLength(2) , Validators.maxLength(50)]);
  descriptionControl = new FormControl<string | null>(null, [Validators.required, Validators.minLength(5) , Validators.maxLength(50)]);

  courseForm = new FormGroup({
    nameCourse: this.nameCourseControl,
    description: this.descriptionControl,
  });


  constructor(
    private dialogRef: MatDialogRef<CourseFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: Course,
  ) {

    if(this.data){
      this.editingCourse = this.data;
      this.nameCourseControl.setValue(this.data.nameCourse);
      this.descriptionControl.setValue(this.data.description);
    }
  }

  onSubmit(): void {
    if(this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.courseForm.value);
    }
  }
}
