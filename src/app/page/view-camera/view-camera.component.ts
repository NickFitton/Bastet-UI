import {Component} from '@angular/core';
import {UserService} from '../../shared/api/user/user.service';
import {Router} from '@angular/router';
import {CameraService} from '../../shared/api/camera/camera.service';
import {CameraModel} from '../../shared/api/camera/camera.model';
import {MotionService} from '../../shared/api/motion/motion.service';
import {UserDependantComponent} from '../../shared/component/user-dependant.component';
import {MotionModel} from '../../shared/api/motion/motion.model';
import {MatDialog, MatSnackBar} from '@angular/material';
import {PresentImageComponent} from '../../dialog/present-image/present-image.component';
import {GraphModel} from '../../shared/component/graph/graph.model';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-view-camera',
  templateUrl: './view-camera.component.html',
  styleUrls: ['./view-camera.component.styl']
})
export class ViewCameraComponent extends UserDependantComponent {

  private camera: CameraModel;
  private cameraId: string;
  private cameraName: string;
  private timeframe: string;
  private retrievedMotion: MotionModel[];
  private hourOrganisedData: MotionModel[][];
  private images: string[];
  private activityData: GraphModel;
  private cameraNotFound: boolean;

  private changingName: boolean;

  constructor(
      userService: UserService,
      router: Router,
      dialog: MatDialog,
      snackBar: MatSnackBar,
      private cameraService: CameraService,
      private motionService: MotionService) {
    super(userService, router, dialog, snackBar);
    this.cameraNotFound = false;
    this.timeframe = 'day';
    this.camera = null;
    this.changingName = false;
    this.hourOrganisedData = [];

    const url = this.router.url;
    const segments = url
        .split('/')
        .map(segment => {
          if (segment.includes('?')) {
            return segment.split('?')[0];
          }
          return segment;
        })
        .filter(segment => segment.length > 0);

    this.cameraId = segments[segments.length - 1];

    this.activityData = new GraphModel('Entity Frequency day', 'LineChart', ['Time'],
        {
          hAxis: {
            title: 'Time'
          },
          vAxis: {
            title: 'Event Frequency'
          },
        }, '45%', 250);
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

    for (const pointer of ViewCameraComponent.getHourPointers()) {
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
    for (const hour of ViewCameraComponent.getHourPointers()) {
      tempHash[hour] = 0;
    }
    return tempHash;
  }

  generatePanelTitle(groupDate: Date): string {
    return '' + groupDate.getHours() + ':00 - ' + groupDate.getDate() + '/' + (groupDate.getMonth() + 1) + '/' + groupDate.getFullYear();
  }

  inInit(): Promise<void> {
    super.inInit();
    return this.cameraService.getCamera(this.cameraId).then(camera => {
      this.camera = camera;
      this.cameraName = camera.getName();
      return camera;
    }).then(() => {
      this.timeframeChanged();
    }, error => {
      if (error instanceof HttpErrorResponse) {
        const httpError = <HttpErrorResponse>error;
        if (httpError.status === 404) {
          this.cameraNotFound = true;
        }
      }
    });
  }

  timeframeChanged() {
    this.activityData.title = 'Entity Frequency ' + this.timeframe;
    this.activityData.options.title = 'Entity Frequency ' + this.timeframe;
    const now = new Date(Date.now());
    let from;
    switch (this.timeframe) {
      case 'day':
        from = new Date(now.valueOf() - 86400000);
        break;
      default:
      case 'week':
        from = new Date(now.valueOf() - 604800000);
        break;
      case 'month':
        from = new Date(now.valueOf() - 2592000000);
        break;
      case 'quarter':
        from = new Date(now.valueOf() - 10368000000);
        break;
      case 'year':
        from = new Date(now.valueOf() - 31536000000);
        break;
    }

    this.retrievedMotion = [];
    this.images = [];
    this.motionService.getMotionBetween(from, now, [this.camera.getId()])
        .then(
            motionData => {
              this.addCameraMotionToDataset(this.cameraId, motionData);
              for (const motion of motionData) {
                // this.motionService.getImage(motion.getId())
                //   .then(image => {
                //     const reader = new FileReader();
                //     reader.addEventListener('load', () => {
                //       if (typeof reader.result === 'string') {
                //         motion.setImage(reader.result);
                this.retrievedMotion.push(motion);
                //     } else {
                //       console.log(reader.result);
                //     }
                //   }, false);
                //
                //   if (image) {
                //     reader.readAsDataURL(image);
                //   }
                // });
              }
            },
            error => {
              console.error(error);
            }).then(() => {
      const groupedMotion = new Map<string, MotionModel[]>();
      this.retrievedMotion.sort((a, b) => {
        if (a.getImageTime().getTime() >= b.getImageTime().getTime()) {
          return -1;
        } else {
          return 1;
        }
      }).forEach(motionModel => {
        const imageTime = motionModel.getImageTime();
        const key = '' + imageTime.getFullYear() + imageTime.getMonth() + imageTime.getDay() + imageTime.getHours();
        if (!groupedMotion.has(key)) {
          groupedMotion.set(key, [motionModel]);
        } else {
          const motionArray = groupedMotion.get(key);
          motionArray.push(motionModel);
          groupedMotion.set(key, motionArray);
        }
      });
      return groupedMotion;
    }).then(groupedMotion => {
      groupedMotion.forEach(motionArray => {
        this.hourOrganisedData.push(motionArray);
      });
    });
  }

  addCameraMotionToDataset(cameraName: string, motionData: MotionModel[]): void {
    const hours = motionData.map(motion => motion.getCreatedAt().getHours()).map(hour => {
      if (hour < 10) {
        return '0' + hour + ':00';
      } else {
        return hour + ':00';
      }
    });
    const tempData = ViewCameraComponent.generateBlankHash();
    for (const hour of hours) {
      tempData[hour]++;
    }
    this.addCameraToDataset(cameraName, tempData);
  }

  addCameraToDataset(cameraName: string, data: any): void {
    this.activityData.hashData = GraphModel.generateBlankHashData();
    for (const pointer of ViewCameraComponent.getHourPointers()) {
      this.activityData.hashData[pointer].push(data[pointer]);
    }
    this.activityData.data = ViewCameraComponent.hashDataToColumnData(this.activityData.hashData);
    this.activityData.columnNames.push(cameraName);
  }

  cancelNameChange(): void {
    this.changingName = false;
    this.cameraName = this.camera.getName();
  }

  changeName() {
    const newData = new CameraModel(this.camera.getId(), null, this.cameraName, null, null, null);
    this.cameraService.updateCamera(newData).then(success => {
      if (success) {
        this.changingName = false;
        this.inInit();
      } else {
        console.error('Failed to change name');
      }
    });
  }

  presentImage(motion: MotionModel): void {
    this.dialog.open(PresentImageComponent, {
      data: motion,
    });
  }

  triggerPhotoLoad(motionHour: MotionModel[]) {
    motionHour.filter(motion => motion.getImage() !== null)
        .forEach(motion => {
          this.motionService.getImage(motion.getId())
              .then(image => {
                const reader = new FileReader();
                reader.addEventListener('load', () => {
                  if (typeof reader.result === 'string') {
                    motion.setImage(reader.result);
                  } else {
                    console.log(reader.result);
                  }
                }, false);
                if (image) {
                  reader.readAsDataURL(image);
                }
              });
        });
  }
}
