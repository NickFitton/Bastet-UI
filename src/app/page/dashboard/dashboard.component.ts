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
import { MotionService } from '../../shared/api/motion/motion.service';
import { MotionModel } from '../../shared/api/motion/motion.model';
import { GraphModel } from '../../shared/component/graph/graph.model';

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
  cameraNames: string[];

  frequencyTitle = 'Event Frequency per Camera';
  frequencyType = 'LineChart';
  frequencyData: any[][];
  frequencyHashData = {
    '00:00': [], '01:00': [], '02:00': [], '03:00': [], '04:00': [], '05:00': [], '06:00': [], '07:00': [],
    '08:00': [], '09:00': [], '10:00': [], '11:00': [], '12:00': [], '13:00': [], '14:00': [], '15:00': [],
    '16:00': [], '17:00': [], '18:00': [], '19:00': [], '20:00': [], '21:00': [], '22:00': [], '23:00': []
  };
  frequencyColumnNames = ['Time'];
  frequencyOptions = {
    hAxis: {
      title: 'Time'
    },
    vAxis: {
      title: 'Event Frequency'
    },
  };
  frequencyWidth = 450;
  frequencyHeight = 250;

  frequencyGraphData: GraphModel;

  constructor(
    router: Router,
    userService: UserService,
    dialog: MatDialog,
    snackBar: MatSnackBar,
    private cameraService: CameraService,
    private groupService: GroupService,
    private motionService: MotionService) {
    super(userService, router, dialog, snackBar);
    this.user = null;
    this.frequencyData = DashboardComponent.hashDataToColumnData(this.frequencyHashData);
    this.frequencyGraphData = new GraphModel('Event Frequency per Camera', 'LineChart', ['Time'],
      {
        hAxis: {
          title: 'Time'
        },
        vAxis: {
          title: 'Event Frequency'
        },
      }, 450, 250);
  }

  static getHourPointers(): string[] {
    const hours = [];
    for (let i = 0; i < 10; i++) {
      hours.push('0' + i + ':00');
    }
    for (let i = 10; i < 24; i++) {
      hours.push(i + ':00');
    }
    return hours;
  }

  static hashDataToColumnData(hashData: any): any[][] {
    const tempColumnData = [];

    for (const pointer of DashboardComponent.getHourPointers()) {
      const column = [];
      const hashDatum = hashData[pointer];
      column.push(pointer);
      for (const element of hashDatum) {
        column.push(element);
      }
      tempColumnData.push(column);
    }
    return tempColumnData;
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
    if (existing) {
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
    } else {
      this.groups = [];
      for (const group of newGroups) {
        this.groups.push(group);
      }
    }
  }

  updateCameras(existing: CameraModel[], newCameras: CameraModel[]): void {
    if (existing) {
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
    } else {
      this.cameras = [];
      for (const camera of newCameras) {
        this.cameras.push(camera);
      }
    }
    this.cameraNames = this.cameras.map(camera => camera.getName());


    for (const camera of this.cameras) {
      console.log('camera');
      const now = new Date(Date.now());
      const from = new Date(now.valueOf() - 86400000);
      this.motionService.getMotionBetween(from, now, camera.getId()).then(motion => {
        this.addCameraMotionToDataset(camera.getName(), motion);
      });
    }
  }

  addToDataset(): void {
    const tempHashData = {};
    for (const pointer of DashboardComponent.getHourPointers()) {
      tempHashData[pointer] = Math.floor(Math.random() * 25);
    }
    this.addCameraToDataset('newCamera', tempHashData);
  }

  addCameraMotionToDataset(cameraName: string, motionData: MotionModel[]): void {
    const hours = motionData.map(motion => motion.getCreatedAt().getHours()).map(hour => {
      if (hour < 10) {
        return '0' + hour + ':00';
      } else {
        return hour + ':00';
      }
    });
    const tempData = this.generateBlankHash();
    for (const hour of hours) {
      tempData[hour]++;
    }
    this.addCameraToDataset(cameraName, tempData);
  }

  addCameraToDataset(cameraName: string, data: any): void {
    for (const pointer of DashboardComponent.getHourPointers()) {
      this.frequencyHashData[pointer].push(data[pointer]);
    }
    this.frequencyData = DashboardComponent.hashDataToColumnData(this.frequencyHashData);
    this.frequencyGraphData.data = DashboardComponent.hashDataToColumnData(this.frequencyHashData);
    this.frequencyColumnNames.push(cameraName);
    this.frequencyGraphData.columnNames.push(cameraName);
  }

  generateBlankHash(): any {
    return {
      '00:00': 0, '01:00': 0, '02:00': 0, '03:00': 0, '04:00': 0, '05:00': 0, '06:00': 0, '07:00': 0,
      '08:00': 0, '09:00': 0, '10:00': 0, '11:00': 0, '12:00': 0, '13:00': 0, '14:00': 0, '15:00': 0,
      '16:00': 0, '17:00': 0, '18:00': 0, '19:00': 0, '20:00': 0, '21:00': 0, '22:00': 0, '23:00': 0,
    };
  }

  generateBlankHashData(): any {
    return {
      '00:00': [], '01:00': [], '02:00': [], '03:00': [], '04:00': [], '05:00': [], '06:00': [], '07:00': [],
      '08:00': [], '09:00': [], '10:00': [], '11:00': [], '12:00': [], '13:00': [], '14:00': [], '15:00': [],
      '16:00': [], '17:00': [], '18:00': [], '19:00': [], '20:00': [], '21:00': [], '22:00': [], '23:00': []
    };
  }
}
