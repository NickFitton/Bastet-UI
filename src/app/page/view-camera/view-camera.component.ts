import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/api/user/user.service';
import { UserModel } from '../../shared/api/user/user.model';
import { Router } from '@angular/router';
import { CameraService } from '../../shared/api/camera/camera.service';
import { CameraModel } from '../../shared/api/camera/camera.model';
import { MotionService } from '../../shared/api/motion/motion.service';

@Component({
  selector: 'app-view-camera',
  templateUrl: './view-camera.component.html',
  styleUrls: ['./view-camera.component.styl']
})
export class ViewCameraComponent implements OnInit {

  private user: UserModel;
  private camera: CameraModel;
  private timeframe: string;
  private entityCount: number;

  constructor(
    private userService: UserService,
    private cameraService: CameraService,
    private motionService: MotionService,
    private router: Router) {
  }

  ngOnInit() {
    this.userService.getLoggedIn().then(user => {
      if (user === null || user === undefined) {
        this.router.navigate(['/']);
      }
      this.user = user;
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

      const cameraId = segments[segments.length - 1];

      this.cameraService.getCamera(cameraId).subscribe(
        camera => {
          this.camera = camera;
        },
        error => {
          alert(error);
        }
      );
    });
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

    const motion = [];
    this.motionService.getMotionBetween(from, now, this.camera.getId())
      .subscribe(
        nextMotion => {
          motion.push(nextMotion);
        },
        error => {
          console.error(error);
        },
        () => {
          this.entityCount = motion.length;
        }
      );
  }
}
