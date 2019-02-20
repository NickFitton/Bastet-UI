import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { LeaveGroupConfig } from './leave-group-config.model';
import { StringUtil } from '../../shared/utilities/string.util';
import { GroupService } from '../../shared/api/group/group.service';

@Component({
  selector: 'app-leave-group-dialog-component',
  templateUrl: './leave-group.component.html',
  styleUrls: ['./leave-group.component.styl']
})
export class LeaveGroupComponent {

  private errorMessage: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: LeaveGroupConfig,
    private dialogRef: MatDialogRef<LeaveGroupComponent>,
    private groupService: GroupService) {
  }

  public nameCase(string: string): string {
    return StringUtil.toNameCase(string);
  }

  private confirm(): void {
    let promise;
    if (this.data.leaveType.toLowerCase() === 'delete') {
      promise = this.groupService.deleteGroup(this.data.groupId);
    } else {
      promise = this.groupService.removeUserFromGroup(this.data.groupId, this.data.userId);
    }
    promise.then(success => {
      if (success) {
        this.dialogRef.close();
      } else {
        this.errorMessage = 'Failed to ' + this.data.leaveType + ' group.';
      }
    });
  }
}
