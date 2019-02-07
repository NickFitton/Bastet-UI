import { GroupModel } from '../../shared/api/group/group.model';
import { UserModel } from '../../shared/api/user/user.model';

export class LeaveGroupConfig {
  group: GroupModel;
  user: UserModel;

  constructor(group: GroupModel, user: UserModel) {
    this.group = group;
    this.user = user;
  }
}
