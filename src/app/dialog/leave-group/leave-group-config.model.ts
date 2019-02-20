export class LeaveGroupConfig {
  groupId: string;
  userId: string;
  leaveType: string;

  constructor(groupId: string, userId: string, leaveType: string) {
    this.groupId = groupId;
    this.userId = userId;
    this.leaveType = leaveType;
  }
}
