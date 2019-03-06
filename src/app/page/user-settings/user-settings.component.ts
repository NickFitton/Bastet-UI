import { Component } from '@angular/core';
import { UserModel } from '../../shared/api/user/user.model';
import { GroupModel } from '../../shared/api/group/group.model';
import { CameraModel } from '../../shared/api/camera/camera.model';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ChangePasswordComponent } from '../../dialog/change-password/change-password.component';
import { UserDependantComponent } from '../../shared/component/user-dependant.component';
import { UserService } from '../../shared/api/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.styl']
})
export class UserSettingsComponent extends UserDependantComponent {
  user: UserModel;
  groups: GroupModel[];
  cameras: CameraModel[];
  changesMade: boolean;

  firstName: string;
  lastName: string;
  email: string;

  constructor(dialog: MatDialog, userService: UserService, router: Router, snackBar: MatSnackBar) {
    super(userService, router, dialog, snackBar);
    this.user = new UserModel('your_uuid', 'test', 'user', 'test@account.com', '1234', new Date(2016, 3, 22));
    this.cameras = [];
    this.groups = [];

    this.changesMade = false;
  }

  changePassword() {
    this.dialog.open(ChangePasswordComponent);
  }

}
