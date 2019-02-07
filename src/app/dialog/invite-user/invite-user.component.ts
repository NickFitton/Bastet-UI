import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { InviteUserConfig } from './invite-user.config';

@Component({
  selector: 'app-invite-user-dialog-component',
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.styl']
})
export class InviteUserComponent {

  step: number;

  inviteEmail: string;
  inviteMessage: string;

  constructor(public dialogRef: MatDialogRef<InviteUserComponent>, @Inject(MAT_DIALOG_DATA) public data: InviteUserConfig) {
    this.step = 0;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  invite(): void {
    if (this.data.preexists) {
      this.step = 2;
    } else {
      this.step = 1;
    }
  }

  confirmInvite(): void {
    this.step = 2;
  }

  back(): void {
    this.step = 0;
  }
}
