import { Component, OnInit } from '@angular/core';
import { CameraModel } from '../../shared/api/camera/camera.model';
import { UserModel } from '../../shared/api/user/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cameras',
  templateUrl: './cameras.component.html',
  styleUrls: ['./cameras.component.styl']
})
export class CamerasComponent implements OnInit {

  ownedCameras: CameraModel[];
  sharedCameras: CameraModel[];
  user: UserModel;

  constructor(private router: Router) {
    this.user = new UserModel('your_uuid', 'test', 'user', 'test@account.com', '1234', new Date(2016, 3, 22));
  }

  ngOnInit() {
  }

  onClick(cameraId: string, navigationType: string): void {
    this.router.navigate(['/cameras/' + cameraId], {queryParams: {view: navigationType}});
  }

  createCamera() {
    console.log('creating new camera');
  }
}
