import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { environment } from '../../../../environments/environment';
import { CameraModel } from './camera.model';
import { Observable } from 'rxjs';
import { UserModel } from '../user/user.model';

@Injectable({providedIn: 'root'})
export class CameraService {

  private cameras: CameraModel[];

  constructor(private userService: UserService) {
    const users: UserModel[] = [];
    if (!environment.production) {
      userService.getUsers().subscribe(
        nextUser => {
          users.push(nextUser);
        },
        error => {
          console.log('WTF happened');
          console.error(error);
        },
        () => {
          this.cameras = [];
          this.cameras.push(new CameraModel(
            'c596b9fe-67ed-4abc-b7aa-1d93085ee665',
            users[0].getId(),
            'Front Door',
            new Date(2018, 11, 15),
            new Date(Date.now())));
          this.cameras.push(new CameraModel(
            'c596b9fe-67ed-4abc-b7aa-1d93085ee665',
            users[1].getId(),
            'Front Door',
            new Date(2018, 4, 26),
            new Date(Date.now())));
        });
    }
  }

  getCameras(): Observable<CameraModel> {
    return Observable.create(observer => {
      for (const camera of this.cameras) {
        observer.next(camera);
      }
      observer.complete();
    });
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

  existsById(id: string): Observable<boolean> {
    return Observable.create(observer => {
      let exists = false;
      for (const camera of this.cameras) {
        if (camera.getId() === id) {
          exists = true;
          break;
        }
      }
      observer.next(exists);
      observer.complete();
    });
  }

  createCamera(camera: CameraModel): Observable<CameraModel> {
    return Observable.create(observer => {
      const newCamera = new CameraModel(
        camera.getId(),
        camera.getOwnedBy(),
        camera.getName(),
        new Date(Date.now()),
        new Date(Date.now()));
      this.cameras.push(newCamera);
      observer.next(newCamera);
      observer.complete();
    });
  }
}
