import { Component, OnInit } from '@angular/core';
import { CameraModel } from '../../shared/api/camera/camera.model';
import { UserModel } from '../../shared/api/user/user.model';
import { Router } from '@angular/router';
import { UserService } from '../../shared/api/user/user.service';
import { CameraService } from '../../shared/api/camera/camera.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.styl']
})
export class DashboardComponent implements OnInit {

  cameras: CameraModel[];
  user: UserModel;

  constructor(private router: Router, private userService: UserService, private cameraService: CameraService) {
    const loggedInUser = userService.getLoggedIn();
    if (loggedInUser === null || loggedInUser === undefined) {
      router.navigate(['/login']);
    } else {
      this.user = loggedInUser;
    }
    this.cameras = [];
    console.log(loggedInUser);
    cameraService.getOwnedCameras(loggedInUser.getId()).subscribe(
      nextCamera => {
        this.cameras.push(nextCamera);
      });
  }

  ngOnInit(): void {
  }

  onClick(cameraId: string, navigation: string): void {
    this.router.navigate(['/cameras/' + cameraId], {queryParams: {view: navigation}});
  }

}
