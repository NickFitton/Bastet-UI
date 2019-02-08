import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { MotionModel } from './motion.model';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class MotionService {

  motionCache: MotionModel[];

  constructor() {
    if (environment.production !== true) {
      this.motionCache = [];
      for (let i = 0; i < 100; i++) {
        const motionEntities = [];
        for (let j = 0; j < 10; j++) {
          motionEntities.push(i + j % 100, i + j % 50, i * j % 40, i * j % 25);
        }
        const id = i.toString(16);
        let uuid = '5c1ec695-a38a-4f9c-8164-2875f41ce359';
        uuid = id + uuid.substring(id.length, uuid.length - id.length);
        this.motionCache.push(
          new MotionModel(
            uuid,
            new Date(Date.now() - (i * 1000)),
            new Date(Date.now()),
            new Date(Date.now() - (Math.random() * i * 1000)),
            new Date(Date.now()),
            new Date(Date.now()),
            false,
            motionEntities));
      }
    }
  }

  getMotionBetween(from: Date, to: Date, cameraId: string): Observable<MotionModel> {
    const diff = (to.valueOf() / 1000) - (from.valueOf() / 1000);

    console.log('diff: ' + diff);
    const months = Math.floor(diff / 31104);
    const numOfMotions = Math.min(100, months);

    return Observable.create(observer => {
      for (let p = 0; p < numOfMotions; p++) {
        try {
          observer.next(this.motionCache[p]);
        } catch (e) {
          observer.error(e);
        }
      }
      observer.complete();
    });
  }
}
