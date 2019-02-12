import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../shared/api/user/user.model';
import { GroupModel } from '../../shared/api/group/group.model';
import { CameraModel } from '../../shared/api/camera/camera.model';
import { MatDialog } from '@angular/material';
import { ChangePasswordComponent } from '../../dialog/change-password/change-password.component';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.styl']
})
export class UserSettingsComponent implements OnInit {
  user: UserModel;
  groups: GroupModel[];
  cameras: CameraModel[];
  changesMade: boolean;

  firstName: string;
  lastname: string;
  email: string;

  constructor(private dialog: MatDialog) {
    const johnDoe = new UserModel('john_uuid', 'john', 'doe', 'j.doe@account.com', '1234', new Date(2010, 1, 1));

    this.user = new UserModel('your_uuid', 'test', 'user', 'test@account.com', '1234', new Date(2016, 3, 22));
    const cameraPop = [];
    cameraPop.push(new CameraModel('camera_uuid_1', 'your_uuid', 'Front Door', new Date(2016, 5, 3), new Date(2016, 5, 3), new Date(Date.now())));
    cameraPop.push(new CameraModel('camera_uuid_2', 'not_your_uuid', 'Garage', new Date(2016, 6, 26), new Date(2016, 6, 26), new Date(Date.now())));
    this.cameras = cameraPop;
    const firstUserGroup = new GroupModel(
      'f4a2f55b-bc62-4edd-b245-e675d4f6121a',
      'Home',
      this.user,
      [this.user],
      [new CameraModel('camera_uuid_1', 'your_uuid', 'Front Door', new Date(2016, 5, 3), new Date(2016, 5, 3), new Date(Date.now()))]);
    const secondUserGroup = new GroupModel(
      '0820b940-7da2-496a-8124-17332da19575',
      'Neighbours',
      johnDoe,
      [johnDoe, this.user],
      [new CameraModel('camera_uuid_2', 'your_uuid', 'Front Door', new Date(2016, 5, 3), new Date(2016, 5, 3), new Date(Date.now()))]);
    this.groups = [];
    this.groups.push(firstUserGroup, secondUserGroup);

    this.changesMade = false;
  }

  ngOnInit() {
  }

  changePassword() {
    this.dialog.open(ChangePasswordComponent);
  }

}
