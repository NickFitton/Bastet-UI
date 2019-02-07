import { Component, OnInit } from '@angular/core';
import { GroupModel } from '../../shared/api/group/group.model';
import { LeaveGroupComponent } from '../../dialog/leave-group/leave-group.component';
import { LeaveGroupConfig } from '../../dialog/leave-group/leave-group-config.model';
import { MatDialog } from '@angular/material';
import { UserModel } from '../../shared/api/user/user.model';

@Component({
  selector: 'app-manage-user-group',
  templateUrl: './manage-user-group.component.html',
  styleUrls: ['./manage-user-group.component.styl']
})
export class ManageUserGroupComponent implements OnInit {

  user: UserModel;

  constructor(private dialog: MatDialog) {
    this.user = new UserModel('your_uuid', 'test', 'user', 'test@account.com', '1234', new Date(2016, 3, 22));
  }

  ngOnInit() {
  }

  leaveGroup(group: GroupModel): void {
    console.log('User wants to leave group: ' + group.getId());
    const dialog = this.dialog.open(LeaveGroupComponent, {
      data: new LeaveGroupConfig(group, this.user)
    });

    dialog.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        console.log('User is leaving');
      } else {
        console.log('User is not leaving');
      }
    });
  }

}
