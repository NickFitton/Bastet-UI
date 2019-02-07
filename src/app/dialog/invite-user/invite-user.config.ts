export class InviteUserConfig {
  preexists: boolean;
  inviteType: InviteType;
  from: string;

  constructor(preexists: boolean, inviteType: InviteType, from: string) {
    this.preexists = preexists;
    this.inviteType = inviteType;
    this.from = from;
  }
}

export enum InviteType {CAMERA, GROUP, APP}
