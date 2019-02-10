import { Injectable } from '@angular/core';
import { CameraModel } from './camera.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../user/user.service';

@Injectable({providedIn: 'root'})
export class CameraService {

  private cameras: CameraModel[];

  private static readonly CAMERAS_PATH = '/v1/cameras';

  private static cameraPath(cameraId: string): string {
    return this.CAMERAS_PATH + '/' + cameraId;
  }

  constructor(private client: HttpClient, private userService: UserService) {
    this.cameras = [];
  }

  claimCamera(cameraId: string): Promise<boolean> {
    const headers = new HttpHeaders({'authorization': 'Token ' + this.userService.getToken()});

    return this.client.patch(CameraService.cameraPath(cameraId), null, {
      observe: 'response',
      headers: headers
    }).toPromise()
      .then(response => response.status === 202);
  }

  getOwnedCameras(userId: string): Observable<CameraModel> {
    return Observable.create(observer => {
      for (const camera of this.cameras) {
        if (camera.getOwnedBy() === userId) {
          observer.next(camera);
        }
      }
      observer.complete();
    });
  }

  getCamera(id: string): Observable<CameraModel> {
    return Observable.create(observer => {
      let exists = false;
      for (const camera of this.cameras) {
        if (camera.getId() === id) {
          observer.next(camera);
          observer.complete();
          exists = true;
          break;
        }
      }
      if (!exists) {
        observer.error('404');
      }
    });
  }
}
