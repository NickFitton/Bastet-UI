import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { CameraModel } from './camera.model';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CameraService {

  private cameras: CameraModel[];

  constructor(private userService: UserService) {
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
