export class InviteUserConfig {
  preexists: boolean;
  inviteType: InviteType;
  from: string;

  constructor(preexists: boolean, inviteType: InviteType, groupId: string) {
    this.preexists = preexists;
    this.inviteType = inviteType;
    this.from = groupId;
  }
}

export enum InviteType {CAMERA, GROUP, APP}
