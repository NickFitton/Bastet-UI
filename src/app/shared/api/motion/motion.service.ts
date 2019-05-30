import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { MotionModel } from './motion.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MotionBean } from './motion.bean';
import { UserService } from '../user/user.service';
import { EntityBean } from './entity.bean';
import { EntityModel } from './entity.model';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class MotionService {

  constructor(public client: HttpClient, public userService: UserService) {

  }
  public readonly GET_MOTION_URL = environment.serverUrl + '/v1/motion';

  static mapToEntityModel(entity: EntityBean): EntityModel {
    return new EntityModel(entity.x,
      entity.y,
      entity.width,
      entity.height,
      entity.type);
  }

  static mapToMotionModel(motion: MotionBean): MotionModel {
    const entities = [];
    for (const entity of motion.imageEntities) {
      entities.push(this.mapToEntityModel(entity));
    }

    return new MotionModel(
      motion.id,
      new Date(motion.entryTime),
      new Date(motion.exitTime),
      new Date(motion.imageTime),
      new Date(motion.createdAt),
      new Date(motion.updatedAt),
      motion.fileExists,
      entities
    );
  }

  public generateAuthHeaders(): HttpHeaders {
    return new HttpHeaders({'authorization': 'Token ' + this.userService.getToken()});
  }

  public cameraMotionUrl(cameraIds: string[], from: Date, to: Date) {
    return this.GET_MOTION_URL + '?cameras=' + cameraIds.join(',') + '&from=' + from.toISOString() + '&to=' + to.toISOString();
  }

  getMotionBetween(from: Date, to: Date, cameraIds: string[]): Promise<MotionModel[]> {
    return this.client.get<BackendModel<MotionBean[]>>(this.cameraMotionUrl(cameraIds, from, to), {
      observe: 'response',
      headers: this.generateAuthHeaders()
    }).toPromise()
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          return response.body.data;
        } else {
          throw response.status;
        }
      }).then(beans => {
        const models = [];
        for (const bean of beans) {
          models.push(MotionService.mapToMotionModel(bean));
        }

        return models;
      });
  }

  getImage(imageId: string): Promise<Blob> {
    return this.client.get(`${this.GET_MOTION_URL}/${imageId}/image`, {
      observe: 'response',
      responseType: 'blob',
      headers: this.generateAuthHeaders()
    }).toPromise()
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          return response.body;
        } else {
          throw response.status;
        }
      });
  }
}
