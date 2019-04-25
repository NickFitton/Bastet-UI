import { Injectable } from '@angular/core';
import { CameraModel } from './camera.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { environment } from '../../../../environments/environment';
import { CameraBean } from './camera.bean';

@Injectable({providedIn: 'root'})
export class CameraService {

  private static readonly CAMERAS_PATH = environment.serverUrl + '/v1/cameras';
  private cameras: CameraModel[];

  constructor(private client: HttpClient, private userService: UserService) {
    this.cameras = [];
  }

  static mapFromBean(bean: CameraBean): CameraModel {
    return new CameraModel(
      bean.id,
      bean.ownedBy,
      bean.name,
      new Date(bean.createdAt),
      new Date(bean.updatedAt),
      new Date(bean.lastUpload));
  }

  private static cameraPath(cameraId: string): string {
    return this.CAMERAS_PATH + '/' + cameraId;
  }

  claimCamera(cameraId: string): Promise<boolean> {
    return this.client.patch(CameraService.cameraPath(cameraId), null, {
      observe: 'response',
      headers: this.generateAuthHeaders()
    }).toPromise()
      .then(response => response.status === 202);
  }

  updateCamera(camera: CameraModel): Promise<boolean> {
    return this.client.patch(CameraService.cameraPath(camera.getId()), camera, {
      observe: 'response',
      headers: this.generateAuthHeaders()
    }).toPromise()
      .then(response => response.status === 202);
  }

  getOwnedCameras(): Promise<CameraModel[]> {
    return this.client.get<BackendModel<CameraBean[]>>(CameraService.CAMERAS_PATH, {
      observe: 'response',
      headers: this.generateAuthHeaders()
    }).toPromise()
      .then(response => {
        if (response.status === 200) {
          return response.body.data;
        } else {
          throw response.status;
        }
      })
      .then(cameras => {
        const models = [];
        for (const camera of cameras) {
          models.push(CameraService.mapFromBean(camera));
        }
        return models;
      });
  }

  getCamera(id: string): Promise<CameraModel> {
    return this.client.get<BackendModel<CameraBean>>(CameraService.cameraPath(id), {
      observe: 'response',
      headers: this.generateAuthHeaders()
    }).toPromise()
      .then(response => {
        if (response.status === 200) {
          return response.body.data;
        } else {
          throw response.status;
        }
      }).then(camera => CameraService.mapFromBean(camera));
  }

  deleteCamera(id: string): Promise<void> {
    return this.client.delete(CameraService.cameraPath(id), {
      observe: 'response',
      headers: this.generateAuthHeaders()
    }).toPromise().then(response => {
      if (response.status === 204) {
        return Promise.resolve();
      } else {
        throw response.status;
      }
    });
  }

  private generateAuthHeaders(): HttpHeaders {
    return new HttpHeaders({'authorization': 'Token ' + this.userService.getToken()});
  }
}
