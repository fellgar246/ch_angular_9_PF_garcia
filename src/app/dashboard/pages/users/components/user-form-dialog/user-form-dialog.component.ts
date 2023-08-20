import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models';

@Component({
  selector: 'app-user-form-dialog',
  templateUrl: './user-form-dialog.component.html',
  styleUrls: ['./user-form-dialog.component.scss']
})
export class UserFormDialogComponent {

  editingUser?: User;

  nameControl = new FormControl<String | null>(null, [Validators.required, Validators.minLength(2)]);
  lastNameControl = new FormControl<String | null>(null, [Validators.required]);
  emailControl = new FormControl<String | null>(null, [Validators.required, Validators.email]);
  roleControl = new FormControl<String | null>(null, [Validators.required]);

  userForm = new FormGroup({
    name: this.nameControl,
    lastName: this.lastNameControl,
    email: this.emailControl,
    role: this.roleControl,
  });


  constructor(
    private dialogRef: MatDialogRef<UserFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: User,
  ) {

    if(this.data){
      this.editingUser = this.data;
      this.nameControl.setValue(this.data.name);
      this.lastNameControl.setValue(this.data.lastName);
      this.emailControl.setValue(this.data.email);
      this.roleControl.setValue(this.data.role);
    }
  }

  onSubmit(): void {
    if(this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.userForm.value);
    }
  }
}
