import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CameraModel } from '../../shared/api/camera/camera.model';
import { GroupService } from '../../shared/api/group/group.service';
import { CameraToGroupsConfig } from './camera-to-groups.config';

@Component({
  selector: 'app-camera-to-groups',
  templateUrl: './camera-to-groups.component.html',
  styleUrls: ['./camera-to-groups.component.styl']
})
export class CameraToGroupsComponent implements OnInit {

  public step: number;
  public cameras: CameraModel[];
  public selectedCamera: string;

  constructor(public dialogRef: MatDialogRef<CameraToGroupsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: CameraToGroupsConfig, public groupService: GroupService) {
    data.getCameraPromise().then(cameraData => {
      this.cameras = cameraData;
    });
    this.step = 1;
  }

  ngOnInit() {
  }

  connectCamera() {
    this.groupService.addCameraToGroup(this.data.getGroupId(), this.selectedCamera).then(
      newGroupData => {
        this.dialogRef.close(newGroupData);
      }
    );
  }
}
