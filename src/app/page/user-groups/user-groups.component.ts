import { Component } from '@angular/core';
import { GroupModel } from '../../shared/api/group/group.model';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { InviteType, InviteUserConfig } from '../../dialog/invite-user/invite-user.config';
import { InviteUserComponent } from '../../dialog/invite-user/invite-user.component';
import { UserDependantComponent } from '../../shared/component/user-dependant.component';
import { UserService } from '../../shared/api/user/user.service';
import { GroupService } from '../../shared/api/group/group.service';
import { CreateGroupComponent } from '../../dialog/create-group/create-group.component';

@Component({
  selector: 'app-user-groups',
  templateUrl: './user-groups.component.html',
  styleUrls: ['./user-groups.component.styl']
})
export class UserGroupsComponent extends UserDependantComponent {

  adminGroups: GroupModel[];
  otherGroups: GroupModel[];

  constructor(
    router: Router,
    userService: UserService,
    dialog: MatDialog,
    snackBar: MatSnackBar,
    private groupService: GroupService) {
    super(userService, router, dialog, snackBar);
    this.adminGroups = [];
    this.otherGroups = [];
  }

  inInit(): Promise<void> {
    this.adminGroups = [];
    this.otherGroups = [];
    return this.groupService.getUserGroups().then(
      groups => {
        for (const group of groups) {
          if (group.getAdmin() === this.user.getId()) {
            this.adminGroups.push(group);
          } else {
            this.otherGroups.push(group);
          }
        }
      }
    );
  }

  inviteClicked(groupId: string, type: string): void {
    this.dialog.open(
      InviteUserComponent,
      {
        minWidth: '500px',
        data: new InviteUserConfig(type !== 'new', InviteType.CAMERA, this.user.getId())
      });
  }

  createGroup() {
    const groupDialog = this.dialog.open(CreateGroupComponent, {width: '50%'});
    groupDialog.afterClosed().toPromise().then(
      () => this.inInit());
  }
}
