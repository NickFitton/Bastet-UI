import { Component, OnInit } from '@angular/core';
import { GroupModel } from '../../shared/api/group/group.model';
import { UserModel } from '../../shared/api/user/user.model';
import { CameraModel } from '../../shared/api/camera/camera.model';

@Component({
  selector: 'app-user-groups',
  templateUrl: './user-groups.component.html',
  styleUrls: ['./user-groups.component.styl']
})
export class UserGroupsComponent implements OnInit {

  user: UserModel;
  userGroups: GroupModel[];

  constructor() {
    this.user = new UserModel('your_uuid', 'test', 'user', 'test@account.com', new Date(2016, 3, 22));
    const johnDoe = new UserModel('john_uuid', 'john', 'doe', 'j.doe@account.com', new Date(2010, 1, 1));

    const firstUserGroup = new GroupModel(
      'Home',
      this.user,
      [this.user],
      [new CameraModel('camera_uuid_1', 'your_uuid', 'Front Door', new Date(2016, 5, 3), new Date(Date.now()))]);
    const secondUserGroup = new GroupModel(
      'Neighbours',
      johnDoe,
      [johnDoe, this.user],
      [new CameraModel('camera_uuid_2', 'your_uuid', 'Front Door', new Date(2016, 5, 3), new Date(Date.now()))]);
    this.userGroups = [];
    this.userGroups.push(firstUserGroup, secondUserGroup  );
  }

  ngOnInit() {
  }

}
