import { Component } from '@angular/core';
import { GroupModel } from '../../shared/api/group/group.model';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ChangePasswordComponent } from '../../dialog/change-password/change-password.component';
import { UserDependantComponent } from '../../shared/component/user-dependant.component';
import { UserService } from '../../shared/api/user/user.service';
import { Router } from '@angular/router';
import { GroupService } from '../../shared/api/group/group.service';
import { CameraService } from '../../shared/api/camera/camera.service';
import { ChangePasswordConfig } from '../../dialog/change-password/change-password.config';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.styl']
})
export class UserSettingsComponent extends UserDependantComponent {
  groups: GroupModel[];
  cameraCount: number;

  firstName: string;
  lastName: string;
  email: string;

  constructor(dialog: MatDialog, userService: UserService, private groupService: GroupService, private cameraService: CameraService, router: Router, snackBar: MatSnackBar) {
    super(userService, router, dialog, snackBar);
    this.groups = [];
  }

  inInit(): Promise<void> {
    return super.inInit().then(() => {
      this.firstName = this.user.getFirstName();
      this.lastName = this.user.getLastName();
      this.email = this.user.getEmail();

      return this.groupService.getUserGroups();
    }).then(userGroups => {
      this.groups = userGroups;
      return this.cameraService.getOwnedCameras();
    }).then(cameras => {
      this.cameraCount = cameras.filter(camera => camera.isOwnedBy(this.user.getId())).length;
    });
  }

  changePassword() {
    this.dialog.open(ChangePasswordComponent, {
      data: new ChangePasswordConfig(this.user.getId())
    });
  }

  saveDetails() {
  }

}
