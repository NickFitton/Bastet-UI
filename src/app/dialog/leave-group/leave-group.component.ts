import { Component, Inject } from '@angular/core';
import { GroupModel } from '../../shared/api/group/group.model';
import { MAT_DIALOG_DATA } from '@angular/material';
import { UserModel } from '../../shared/api/user/user.model';
import { LeaveGroupConfig } from './leave-group-config.model';

@Component({
  selector: 'app-leave-group-dialog-component',
  templateUrl: './leave-group.component.html',
  styleUrls: ['./leave-group.component.styl']
})
export class LeaveGroupComponent {

  group: GroupModel;
  user: UserModel;

  constructor(@Inject(MAT_DIALOG_DATA) public data: LeaveGroupConfig) {
    this.group = data.group;
    this.user = data.user;
  }
}
