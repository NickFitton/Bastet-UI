import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { GroupService } from '../../shared/api/group/group.service';

@Component({
  templateUrl: './remove-camera.component.html',
  styleUrls: ['./remove-camera.component.styl']
})
export class RemoveCameraComponent implements OnInit {

  typedCameraId: string;
  cameraId: string;

  constructor(public dialogRef: MatDialogRef<RemoveCameraComponent>, private groupService: GroupService,
              @Inject(MAT_DIALOG_DATA) public config: { cameraId: string, groupId: string }) {
    this.cameraId = config.cameraId.split('-')[0];
    this.typedCameraId = '';
  }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  deleteCamera() {
    this.groupService.removeCameraFromGroup(this.config.groupId, this.config.cameraId).then(
      () => {
        this.dialogRef.close();
      });
  }
}
