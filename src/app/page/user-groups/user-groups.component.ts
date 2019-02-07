import { Component, OnInit } from '@angular/core';
import { GroupModel } from '../../shared/api/group/group.model';
import { UserModel } from '../../shared/api/user/user.model';
import { CameraModel } from '../../shared/api/camera/camera.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { InviteType, InviteUserConfig } from '../../dialog/invite-user/invite-user.config';
import { InviteUserComponent } from '../../dialog/invite-user/invite-user.component';

@Component({
  selector: 'app-user-groups',
  templateUrl: './user-groups.component.html',
  styleUrls: ['./user-groups.component.styl']
})
export class UserGroupsComponent implements OnInit {

  user: UserModel;
  userGroups: GroupModel[];

  constructor(private router: Router, private dialog: MatDialog) {
    this.user = new UserModel('your_uuid', 'test', 'user', 'test@account.com', '1234', new Date(2016, 3, 22));
    const johnDoe = new UserModel('john_uuid', 'john', 'doe', 'j.doe@account.com', '1234', new Date(2010, 1, 1));

    const firstUserGroup = new GroupModel(
      'f4a2f55b-bc62-4edd-b245-e675d4f6121a',
      'Home',
      this.user,
      [this.user],
      [new CameraModel('camera_uuid_1', 'your_uuid', 'Front Door', new Date(2016, 5, 3), new Date(Date.now()))]);
    const secondUserGroup = new GroupModel(
      '0820b940-7da2-496a-8124-17332da19575',
      'Neighbours',
      johnDoe,
      [johnDoe, this.user],
      [new CameraModel('camera_uuid_2', 'your_uuid', 'Front Door', new Date(2016, 5, 3), new Date(Date.now()))]);
    this.userGroups = [];
    this.userGroups.push(firstUserGroup, secondUserGroup);
  }

  ngOnInit() {
  }

  viewGroup(groupId: string): void {
    this.router.navigate(['/groups/' + groupId]);
  }

  inviteClicked(groupId: string, type: string): void {
    this.dialog.open(
      InviteUserComponent,
      {
        minWidth: '500px',
        data: new InviteUserConfig(type !== 'new', InviteType.CAMERA, this.user.getId())
      });
  }
}
