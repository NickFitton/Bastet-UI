import { Component } from '@angular/core';
import { UserService } from '../../shared/api/user/user.service';
import { Router } from '@angular/router';
import { CameraService } from '../../shared/api/camera/camera.service';
import { CameraModel } from '../../shared/api/camera/camera.model';
import { MotionService } from '../../shared/api/motion/motion.service';
import { UserDependantComponent } from '../../shared/component/user-dependant.component';
import { MotionModel } from '../../shared/api/motion/motion.model';
import { DataPointModel } from '../../shared/component/box/data-point.model';

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
  private entityCount: number;
  private retrievedMotion: MotionModel[];
  private chartValues: DataPointModel[];

  private changingName: boolean;

  constructor(
    userService: UserService,
    private cameraService: CameraService,
    private motionService: MotionService,
    router: Router) {
    super(userService, router);
    this.timeframe = 'day';
    this.camera = null;
    this.changingName = false;

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
  }

  static matchingPoint(bars: DataPointModel[], time: Date): number {
    for (let i = 0; i < bars.length; i++) {
      if (bars[i].hoursMatch(time)) {
        return i;
      }
    }
    return -1;
  }

  timeframeChanged() {
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
      case 'quater':
        from = new Date(now.valueOf() - 10368000000);
        break;
      case 'year':
        from = new Date(now.valueOf() - 31536000000);
        break;
    }

    this.retrievedMotion = [];
    this.motionService.getMotionBetween(from, now, this.camera.getId())
      .then(
        motionData => {
          for (const motion of motionData) {
            this.retrievedMotion.push(motion);
          }
          // this.retrievedMotion.push(new DataPointModel(new Date(2019, 2, 12, 12, 0, 0)));
          this.entityCount = this.retrievedMotion.length;
          this.updateChartValues();
        },
        error => {
          console.error(error);
        }
      );
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

  updateChartValues() {
    this.chartValues = [];

    const bars: DataPointModel[] = [];
    for (const motion of this.retrievedMotion) {
      const matching = ViewCameraComponent.matchingPoint(bars, motion.getImageTime());
      if (matching !== -1) {
        bars[matching].increment();
      } else {
        bars.push(new DataPointModel(motion.getImageTime()));
      }
    }
    this.chartValues = bars;
  }

  inInit(): Promise<void> {
    return this.cameraService.getCamera(this.cameraId).then(camera => {
      this.camera = camera;
      this.cameraName = camera.getName();
      return camera;
    }).then(() => {
      this.timeframeChanged();
    });
  }

}
