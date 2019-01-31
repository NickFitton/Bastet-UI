import { UserModel } from '../user/user.model';
import { CameraModel } from '../camera/camera.model';

export class GroupModel {
  private readonly name: string;
  private readonly admin: UserModel;
  private readonly members: UserModel[];
  private readonly cameras: CameraModel[];

  constructor(
    name: string,
    admin: UserModel,
    members: UserModel[],
    cameras: CameraModel[]) {
    this.name = name;
    this.admin = admin;
    this.members = members;
    this.cameras = cameras;
  }

  getName(): string {
    return this.name;
  }

  getAdmin(): UserModel {
    return this.admin;
  }

  getMembers(currentUser: UserModel): UserModel[] {
    const returningMembers = [];
    for (const member of this.members) {
      if (member !== currentUser) {
        returningMembers.push(member);
      }
    }
    return returningMembers;
  }

  getCameras(): CameraModel[] {
    return this.cameras;
  }
}
