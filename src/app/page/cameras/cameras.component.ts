import { Component, OnInit } from '@angular/core';
import { CameraModel } from '../../shared/api/camera/camera.model';
import { UserModel } from '../../shared/api/user/user.model';

@Component({
  selector: 'app-cameras',
  templateUrl: './cameras.component.html',
  styleUrls: ['./cameras.component.styl']
})
export class CamerasComponent implements OnInit {

  ownedCameras: CameraModel[];
  sharedCameras: CameraModel[];
  user: UserModel;

  constructor() {
    this.ownedCameras = [];
    this.ownedCameras.push(new CameraModel('camera_uuid_1', 'your_uuid', 'Front Door', new Date(2016, 5, 3), new Date(Date.now())));

    this.sharedCameras = [];
    this.sharedCameras.push(new CameraModel('camera_uuid_2', 'not_your_uuid', 'Garage', new Date(2016, 6, 26), new Date(Date.now())));

    this.user = new UserModel('your_uuid', 'test', 'user', 'test@account.com', new Date(2016, 3, 22));
  }

  ngOnInit() {
  }

}
