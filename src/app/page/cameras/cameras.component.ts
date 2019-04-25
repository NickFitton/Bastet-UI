import { Component } from '@angular/core';
import { CameraModel } from '../../shared/api/camera/camera.model';
import { Router } from '@angular/router';
import { UserDependantComponent } from '../../shared/component/user-dependant.component';
import { UserService } from '../../shared/api/user/user.service';
import { CameraService } from '../../shared/api/camera/camera.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AddCameraComponent } from '../../dialog/add-camera/add-camera.component';
import { AnimationStatic } from '../../shared/animation.static';

@Component({
  selector: 'app-cameras',
  templateUrl: './cameras.component.html',
  styleUrls: ['./cameras.component.styl'],
  animations: [
    AnimationStatic.fadeInRight
  ]
})
export class CamerasComponent extends UserDependantComponent {

  ownedCameras: CameraModel[];
  sharedCameras: CameraModel[];

  constructor(router: Router, userService: UserService, dialog: MatDialog, snackBar: MatSnackBar, private cameraService: CameraService) {
    super(userService, router, dialog, snackBar);
    this.ownedCameras = [];
    this.sharedCameras = [];
  }

  inInit(): Promise<void> {
    super.inInit();
    return this.cameraService.getOwnedCameras().then(cameras => {
      for (const camera of cameras) {
        if (camera.isOwnedBy(this.user.getId())) {
          if (!this.existsInArray(this.ownedCameras, camera)) {
            this.ownedCameras.push(camera);
          }
        } else if (!this.existsInArray(this.sharedCameras, camera)) {
          this.sharedCameras.push(camera);
        }
      }
      return Promise.resolve();
    });
  }

  existsInArray(array: CameraModel[], camera: CameraModel): boolean {
    return array
      .map(arrayCamera => arrayCamera.getId())
      .filter(cameraId => cameraId === camera.getId())
      .length > 0;
  }

  onClick(cameraId: string, navigationType: string): void {
    console.log(navigationType);
    if (navigationType === 'delete') {
      this.removeCamera(cameraId);
    } else {
      this.router.navigate(['/cameras/' + cameraId], {queryParams: {view: navigationType}});
    }
  }

  addCamera() {
    const cameraDialog = this.dialog.open(AddCameraComponent, {width: '50%'});
    cameraDialog.afterClosed().toPromise().then(
      () => this.inInit());
  }
}
