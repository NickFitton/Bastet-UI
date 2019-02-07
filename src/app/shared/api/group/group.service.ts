import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { GroupModel } from './group.model';
import { UserModel } from '../user/user.model';
import { CameraModel } from '../camera/camera.model';

@Injectable({
  providedIn: 'root',
})
export class GroupService {

  groups: GroupModel[];

  constructor() {
    if (!environment.production) {
      const johnDoe = new UserModel('john_uuid', 'john', 'doe', 'j.doe@account.com', '1234', new Date(2010, 1, 1));

      const firstUserGroup = new GroupModel(
        'f4a2f55b-bc62-4edd-b245-e675d4f6121a',
        'Home',
        null,
        [],
        [new CameraModel('camera_uuid_1', 'your_uuid', 'Front Door', new Date(2016, 5, 3), new Date(Date.now()))]);
      const secondUserGroup = new GroupModel(
        '0820b940-7da2-496a-8124-17332da19575',
        'Neighbours',
        johnDoe,
        [johnDoe],
        [new CameraModel('camera_uuid_2', 'your_uuid', 'Front Door', new Date(2016, 5, 3), new Date(Date.now()))]);
      this.groups = [];
      this.groups.push(firstUserGroup, secondUserGroup);
    }
  }
}
