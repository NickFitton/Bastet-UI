import { Component } from '@angular/core';
import { CameraModel } from '../../shared/api/camera/camera.model';
import { UserModel } from '../../shared/api/user/user.model';
import { Router } from '@angular/router';
import { UserService } from '../../shared/api/user/user.service';
import { CameraService } from '../../shared/api/camera/camera.service';
import { MatDialog } from '@angular/material';
import { AddCameraComponent } from '../../dialog/add-camera/add-camera.component';
import { UserDependantComponent } from '../../shared/component/user-dependant.component';
import { GroupModel } from '../../shared/api/group/group.model';
import { GroupService } from '../../shared/api/group/group.service';
import { CreateGroupComponent } from '../../dialog/create-group/create-group.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.styl']
})
export class DashboardComponent extends UserDependantComponent {

  cameras: CameraModel[];
  groups: GroupModel[];
  user: UserModel;

  constructor(
    router: Router,
    userService: UserService,
    private cameraService: CameraService,
    private groupService: GroupService,
    private dialog: MatDialog) {
    super(userService, router);
    this.user = null;
    this.cameras = [];
    this.groups = [];
  }

  inInit(): Promise<void> {
    return this.cameraService.getOwnedCameras().then(
      cameras => {
        this.cameras = this.cameras.concat(cameras);
        return this.groupService.getUserGroups();
      }).then(groups => {
      this.groups = this.groups.concat(groups);
      return Promise.resolve();
    });
  }

  onClickCamera(cameraId: string, navigation: string): void {
    this.router.navigate(['/cameras/' + cameraId], {queryParams: {view: navigation}});
  }

  onClickGroup(groupId: string, navigation: string): void {
    this.router.navigate(['/groups/' + groupId], {queryParams: {view: navigation}});
  }

  addCamera() {
    const cameraDialog = this.dialog.open(AddCameraComponent, {width: '50%'});
    cameraDialog.afterClosed().toPromise().then(
      () => this.inInit());
  }

  createGroup() {
    const groupDialog = this.dialog.open(CreateGroupComponent, {width: '50%'});
    groupDialog.afterClosed().toPromise().then(
      () => this.inInit());
  }
}
