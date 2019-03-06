import { Component } from '@angular/core';
import { CameraModel } from '../../shared/api/camera/camera.model';
import { UserModel } from '../../shared/api/user/user.model';
import { Router } from '@angular/router';
import { UserService } from '../../shared/api/user/user.service';
import { CameraService } from '../../shared/api/camera/camera.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AddCameraComponent } from '../../dialog/add-camera/add-camera.component';
import { UserDependantComponent } from '../../shared/component/user-dependant.component';
import { GroupModel } from '../../shared/api/group/group.model';
import { GroupService } from '../../shared/api/group/group.service';
import { CreateGroupComponent } from '../../dialog/create-group/create-group.component';
import { AnimationStatic } from '../../shared/animation.static';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.styl'],
  animations: [
    AnimationStatic.fadeInRight
  ]
})
export class DashboardComponent extends UserDependantComponent {

  cameras: CameraModel[];
  groups: GroupModel[];
  user: UserModel;

  constructor(
    router: Router,
    userService: UserService,
    dialog: MatDialog,
    snackBar: MatSnackBar,
    private cameraService: CameraService,
    private groupService: GroupService) {
    super(userService, router, dialog, snackBar);
    this.user = null;
    this.cameras = [];
    this.groups = [];
  }

  inInit(): Promise<void> {
    super.inInit();
    return this.cameraService.getOwnedCameras()
      .then(cameras => {
        this.updateCameras(this.cameras, cameras);
        return this.groupService.getUserGroups();
      }).then(groups => {
        this.updateGroups(this.groups, groups);
        return Promise.resolve();
      });
  }

  onClickCamera(cameraId: string, navigation: string): void {
    this.router.navigate(['/cameras/' + cameraId], {queryParams: {view: navigation}});
  }

  onClickGroup(groupId: string, navigation: string): void {
    // 'View Delete' : 'View Manage'
    switch (navigation.toLowerCase()) {
      case 'view':
      case 'manage':
      default:
        this.router.navigate(['/groups/' + groupId], {queryParams: {view: navigation}});
        break;
      case 'delete':

        break;
      case 'leave':
        console.log('Leave!');
        break;
    }
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

  updateGroups(existing: GroupModel[], newGroups: GroupModel[]): void {
    const existingIds = existing.map(group => group.getId());
    const newIds = newGroups.map(group => group.getId());

    for (let i = 0; i < existing.length; i++) {
      if (!newIds.includes(existing[i].getId())) {
        console.log('Remove element');
        existing.splice(i, 1);
      }
    }

    for (const camera of newGroups) {
      if (!existingIds.includes(camera.getId())) {
        console.log('Push element');
        existing.push(camera);
      }
    }
  }

  updateCameras(existing: CameraModel[], newCameras: CameraModel[]): void {
    const existingIds = existing.map(camera => camera.getId());
    const newIds = newCameras.map(camera => camera.getId());

    for (let i = 0; i < existing.length; i++) {
      if (!newIds.includes(existing[i].getId())) {
        console.log('Remove element');
        existing.splice(i, 1);
      }
    }

    for (const camera of newCameras) {
      if (!existingIds.includes(camera.getId())) {
        console.log('Push element');
        existing.push(camera);
      }
    }
  }

  mockGroup() {
    this.groups.push(new GroupModel(
      '',
      'This is a mock ' + this.groups.length,
      null,
      [],
      []
    ));
  }

  loseGroup() {
    this.groups.splice(0, 1);
  }
}
