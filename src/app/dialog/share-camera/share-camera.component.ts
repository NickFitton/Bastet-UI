import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { CameraService } from '../../shared/api/camera/camera.service';
import { RequestUtil } from '../../shared/api/request.util';

@Component({
  selector: 'app-share-camera',
  templateUrl: './share-camera.component.html',
  styleUrls: ['./share-camera.component.styl']
})
export class ShareCameraComponent implements OnInit {

  step: number;
  cameraId: string;
  errorMessage: string;
  showHelp = false;

  constructor(public dialogRef: MatDialogRef<ShareCameraComponent>, public cameraService: CameraService) {
    this.cameraId = '';
    this.step = 1;
  }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  toggleHelp() {
    this.showHelp = !this.showHelp;
  }

  claimCamera() {
    if (this.cameraId.length === 36) {
      if (RequestUtil.validUuid(this.cameraId)) {
        this.cameraService.claimCamera(this.cameraId).then(
          claimed => {
            if (claimed) {
              this.step = 2;
            } else {
              this.errorMessage = 'Failed to claim camera';
            }
          }
        );
      } else {
        this.errorMessage = 'id is not in a valid format';
      }
    } else {
      this.errorMessage = 'id is not the right length';
    }
  }

  isClear(s: string) {
    return s === null && s === undefined && s === '';
  }

}
