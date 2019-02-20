import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { InviteUserConfig } from './invite-user.config';
import { GroupService } from '../../shared/api/group/group.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-invite-user-dialog-component',
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.styl']
})
export class InviteUserComponent {

  step: number;

  inviteEmail: string;
  inviteMessage: string;
  errorMessage: string;

  constructor(
    public dialogRef: MatDialogRef<InviteUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InviteUserConfig,
    public groupService: GroupService) {
    this.step = 0;
    this.errorMessage = '';
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  invite(): void {
    if (this.data.preexists) {
      this.groupService.addUserToGroup(this.data.from, this.inviteEmail).then(() => {
          this.step = 2;
        },
        reason => {
          this.step = -1;
          if (reason instanceof HttpErrorResponse) {
            const error = <HttpErrorResponse>reason;
            if (error.status === 404) {
              this.errorMessage = 'A user does not exist by the email address given';
            } else if (error.status === 409) {
              this.errorMessage = 'This user is already part of the group';
            } else {
              this.errorMessage = 'The backend returned an unexpected error: ' + error.status + ' contact support for help.';
            }
          } else {
            this.errorMessage = reason.toString();
          }
        });
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
