import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ChangePasswordConfig } from './change-password.config';
import { UserService } from '../../shared/api/user/user.service';

@Component({
  selector: 'app-change-password-dialog-component',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.styl']
})
export class ChangePasswordComponent {

  currentPassword: string;
  newPassword: string;
  repeatedPassword: string;

  constructor(public dialogRef: MatDialogRef<ChangePasswordComponent>, @Inject(MAT_DIALOG_DATA) public data: ChangePasswordConfig,
              public userService: UserService) {
  }

  confirmChange(): void {
    this.userService.updateUserPassword(this.data.getUserId(), this.currentPassword, this.newPassword).then(() => {
      this.dialogRef.close(true);
    }, reason => {
      console.log(reason);
    });
  }
}
