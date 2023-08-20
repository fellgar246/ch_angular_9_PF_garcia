import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from '../../models';

@Component({
  selector: 'app-student-form-dialog',
  templateUrl: './student-form-dialog.component.html',
  styleUrls: ['./student-form-dialog.component.scss']
})
export class StudentFormDialogComponent {

  editingStudent?: Student;

  nameControl = new FormControl<string | null>(null, [Validators.required, Validators.minLength(2)]);
  lastNameControl = new FormControl<string | null>(null, [Validators.required]);
  emailControl = new FormControl<string  | null>(null, [Validators.required, Validators.email]);
  ageControl = new FormControl<number | null>(null, [Validators.required, Validators.min(10), Validators.max(100)]);

  studentForm = new FormGroup({
    name: this.nameControl,
    lastName: this.lastNameControl,
    email: this.emailControl,
    age: this.ageControl,
  });


  constructor(
    private dialogRef: MatDialogRef<StudentFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: Student,
  ) {

    if(this.data){
      this.editingStudent = this.data;
      this.nameControl.setValue(this.data.name);
      this.lastNameControl.setValue(this.data.lastName);
      this.emailControl.setValue(this.data.email);
      this.ageControl.setValue(this.data.age);
    }
  }

  onSubmit(): void {
    if(this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.studentForm.value);
    }
  }
}
