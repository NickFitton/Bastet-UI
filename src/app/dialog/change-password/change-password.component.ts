import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-change-password-dialog-component',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.styl']
})
export class ChangePasswordComponent {

  password: string;
  confirmPassword: string;

  constructor(public dialogRef: MatDialogRef<ChangePasswordComponent>) {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
