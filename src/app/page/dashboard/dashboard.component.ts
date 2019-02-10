import { Component, OnInit } from '@angular/core';
import { CameraModel } from '../../shared/api/camera/camera.model';
import { UserModel } from '../../shared/api/user/user.model';
import { Router } from '@angular/router';
import { UserService } from '../../shared/api/user/user.service';
import { CameraService } from '../../shared/api/camera/camera.service';
import { MatDialog } from '@angular/material';
import { AddCameraComponent } from '../../dialog/add-camera/add-camera.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.styl']
})
export class DashboardComponent implements OnInit {

  cameras: CameraModel[];
  user: UserModel;

  constructor(
    private router: Router,
    private userService: UserService,
    private cameraService: CameraService,
    private dialog: MatDialog) {
    this.user = null;
    this.cameras = [];
  }

  ngOnInit(): void {
    this.userService.getLoggedIn().then(loggedInUser => {
        if (loggedInUser === null || loggedInUser === undefined) {
          this.router.navigate(['/login']);
        } else {
          this.user = loggedInUser;
        }
        this.cameraService.getOwnedCameras(loggedInUser.getId()).subscribe(
          nextCamera => {
            this.cameras.push(nextCamera);
          });
      },
      error => {
        if (error instanceof HttpErrorResponse) {
          const httpError = <HttpErrorResponse>error;
          if (httpError.status === 500) {
            this.userService.logOut();
            this.router.navigate(['/']);
          } else {
            alert(httpError.status);
          }
        } else {
          alert(error);
        }
      });
  }

  onClick(cameraId: string, navigation: string): void {
    this.router.navigate(['/cameras/' + cameraId], {queryParams: {view: navigation}});
  }

  addCamera() {
    this.dialog.open(AddCameraComponent, {width: '50%'});
  }
}
