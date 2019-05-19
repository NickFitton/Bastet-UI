import { Component } from '@angular/core';
import { UserDependantComponent } from '../../shared/component/user-dependant.component';
import { UserService } from '../../shared/api/user/user.service';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { CameraService } from '../../shared/api/camera/camera.service';
import { CameraModel } from '../../shared/api/camera/camera.model';
import { MotionService } from '../../shared/api/motion/motion.service';
import { GraphModel } from '../../shared/component/graph/graph.model';
import { MotionModel } from '../../shared/api/motion/motion.model';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.styl']
})
export class StatisticsComponent extends UserDependantComponent {

  public cameras: CameraModel[];
  public measurements: string[];

  public selectedCameras: CameraModel[];
  public selectedMeasurement: string;
  public selectedTimeframe: string;

  public frequencyStatistics: GraphModel;
  public typeStatistics: GraphModel;

  constructor(
    userService: UserService,
    router: Router,
    dialog: MatDialog,
    snackBar: MatSnackBar,
    public cameraService: CameraService,
    public motionService: MotionService) {
    super(userService, router, dialog, snackBar);
    this.selectedMeasurement = 'Frequency';
    this.selectedTimeframe = 'day';
    this.measurements = ['Frequency', 'Type'];
    this.frequencyStatistics = new GraphModel('Frequency of events per day', 'ColumnChart', ['Time'],
      {
        hAxis: {
          title: 'Time'
        },
        vAxis: {
          title: 'Event Frequency'
        },
        isStacked: true,
      }, '100%', '100%');
    this.typeStatistics = new GraphModel('Frequency of entities per day', 'PieChart', null,
      {
        title: 'Frequency of entities per day'
      }, '100%', '100%');
  }

  static timeframeToTime(now: Date, timeframe: string) {
    switch (timeframe) {
      case 'day':
        return new Date(now.valueOf() - 86400000);
      default:
      case 'week':
        return new Date(now.valueOf() - 604800000);
      case 'month':
        return new Date(now.valueOf() - 2592000000);
      case 'quarter':
        return new Date(now.valueOf() - 10368000000);
      case 'year':
        return new Date(now.valueOf() - 31536000000);
    }
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

    for (const pointer of StatisticsComponent.getHourPointers()) {
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

  static generateBlankHash(): any {
    const tempHash = {};
    for (const hour of StatisticsComponent.getHourPointers()) {
      tempHash[hour] = 0;
    }
    return tempHash;
  }

  inInit(): Promise<void> {
    return super.inInit().then(() => {
      return this.cameraService.getOwnedCameras();
    }).then(cameras => {
      this.cameras = cameras;
      this.selectedCameras = this.cameras;
    }).then(() => this.gatherStatistics());
  }

  gatherStatistics(): void {
    const now = new Date(Date.now());
    const from = StatisticsComponent.timeframeToTime(now, this.selectedTimeframe);

    for (const camera of this.selectedCameras) {
      this.motionService.getMotionBetween(from, now, [camera.getId()]).then(motionData => {
        this.addCameraMotionToDataset(camera.getName(), motionData);
      });
    }
  }

  addCameraMotionToDataset(cameraName: string, motionData: MotionModel[]): void {
    const hours = motionData.map(motion => motion.getCreatedAt().getHours()).map(hour => {
      if (hour < 10) {
        return '0' + hour + ':00';
      } else {
        return hour + ':00';
      }
    });
    const tempData = StatisticsComponent.generateBlankHash();
    for (const hour of hours) {
      tempData[hour]++;
    }
    this.addCameraToDataset(cameraName, tempData);

    const keyCount = new Map<string, number>();
    motionData.map(motion => motion.getImageEntities())
      .map(entities => entities.map(entity => entity.getType()))
      .forEach(entities => {
        entities.forEach(entity => {
          if (!keyCount.has(entity)) {
            keyCount.set(entity, 1);
          } else {
            keyCount.set(entity, keyCount.get(entity) + 1);
          }
        });
      });

    const arrayized = [];
    for (const key of Array.from(keyCount.keys())) {
      arrayized.push([key, keyCount.get(key)]);
    }
    this.typeStatistics.data = arrayized;
  }

  addCameraToDataset(cameraName: string, data: any): void {
    for (const pointer of StatisticsComponent.getHourPointers()) {
      this.frequencyStatistics.hashData[pointer].push(data[pointer]);
    }
    this.frequencyStatistics.data = StatisticsComponent.hashDataToColumnData(this.frequencyStatistics.hashData);
    this.frequencyStatistics.columnNames.push(cameraName);
  }

}
