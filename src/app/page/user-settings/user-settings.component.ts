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
  lastName: string;
  email: string;

  constructor(private dialog: MatDialog) {
    this.user = new UserModel('your_uuid', 'test', 'user', 'test@account.com', '1234', new Date(2016, 3, 22));
    this.cameras = [];
    this.groups = [];

    this.changesMade = false;
  }

  ngOnInit() {
  }

  changePassword() {
    this.dialog.open(ChangePasswordComponent);
  }

}
