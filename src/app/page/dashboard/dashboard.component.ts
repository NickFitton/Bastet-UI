import { Component, OnInit } from '@angular/core';
import { CameraModel } from '../../shared/api/camera/camera.model';
import { UserModel } from '../../shared/api/user/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.styl']
})
export class DashboardComponent implements OnInit {

  cameras: CameraModel[];
  user: UserModel;

  constructor(private router: Router) {
    const cameraPop = [];
    cameraPop.push(new CameraModel('camera_uuid_1', 'your_uuid', 'Front Door', new Date(2016, 5, 3), new Date(Date.now())));
    cameraPop.push(new CameraModel('camera_uuid_2', 'not_your_uuid', 'Garage', new Date(2016, 6, 26), new Date(Date.now())));
    this.cameras = cameraPop;
    this.user = new UserModel('your_uuid', 'test', 'user', 'test@account.com', new Date(2016, 3, 22));
  }

  ngOnInit(): void {
  }

  onClick(cameraId: string, navigation: string): void {
    this.router.navigate(['/camera/' + cameraId], {queryParams: {view: navigation}});
  }

}
