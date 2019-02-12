import { Component } from '@angular/core';
import { CameraModel } from '../../shared/api/camera/camera.model';
import { UserModel } from '../../shared/api/user/user.model';
import { Router } from '@angular/router';
import { UserService } from '../../shared/api/user/user.service';
import { CameraService } from '../../shared/api/camera/camera.service';
import { MatDialog } from '@angular/material';
import { AddCameraComponent } from '../../dialog/add-camera/add-camera.component';
import { UserDependantComponent } from '../../shared/component/user-dependant.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.styl']
})
export class DashboardComponent extends UserDependantComponent {

  cameras: CameraModel[];
  user: UserModel;

  constructor(
    router: Router,
    userService: UserService,
    private cameraService: CameraService,
    private dialog: MatDialog) {
    super(userService, router);
    this.user = null;
    this.cameras = [];
  }

  inInit(): Promise<void> {
    return this.cameraService.getOwnedCameras().then(
      cameras => {
        this.cameras = this.cameras.concat(cameras);
        return Promise.resolve();
      });
  }

  onClick(cameraId: string, navigation: string): void {
    this.router.navigate(['/cameras/' + cameraId], {queryParams: {view: navigation}});
  }

  addCamera() {
    const cameraDialog = this.dialog.open(AddCameraComponent, {width: '50%'});
    cameraDialog.afterClosed().toPromise().then(
      () => {
        return this.inInit();
      }
    );
  }
}
