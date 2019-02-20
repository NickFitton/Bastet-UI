import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../shared/api/user/user.model';

@Component({
  selector: 'app-manage-camera-sharing',
  templateUrl: './manage-camera-sharing.component.html',
  styleUrls: ['./manage-camera-sharing.component.styl']
})
export class ManageCameraSharingComponent implements OnInit {

  user: UserModel;

  constructor() {
    this.user = new UserModel('your_uuid', 'test', 'user', 'test@account.com', '1234', new Date(2016, 3, 22));
  }

  ngOnInit() {
  }

}
