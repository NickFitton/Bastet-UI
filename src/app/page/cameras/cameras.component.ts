import { Component } from '@angular/core';
import { CameraModel } from '../../shared/api/camera/camera.model';
import { Router } from '@angular/router';
import { UserDependantComponent } from '../../shared/component/user-dependant.component';
import { UserService } from '../../shared/api/user/user.service';
import { CameraService } from '../../shared/api/camera/camera.service';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-cameras',
  templateUrl: './cameras.component.html',
  styleUrls: ['./cameras.component.styl']
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
          this.ownedCameras.push(camera);
        } else {
          this.sharedCameras.push(camera);
        }
      }
      return Promise.resolve();
    });
  }

  onClick(cameraId: string, navigationType: string): void {
    this.router.navigate(['/cameras/' + cameraId], {queryParams: {view: navigationType}});
  }

  createCamera() {
    console.log('creating new camera');
  }
}
