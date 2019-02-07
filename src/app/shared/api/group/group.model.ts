import { UserModel } from '../user/user.model';
import { CameraModel } from '../camera/camera.model';

export class GroupModel {
  private readonly id: string;
  private readonly name: string;
  private readonly admin: UserModel;
  private readonly members: UserModel[];
  private readonly cameras: CameraModel[];

  constructor(
    id: string,
    name: string,
    admin: UserModel,
    members: UserModel[],
    cameras: CameraModel[]) {
    this.id = id;
    this.name = name;
    this.admin = admin;
    this.members = members;
    this.cameras = cameras;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getAdmin(): UserModel {
    return this.admin;
  }

  getMembers(): UserModel[] {
    return this.members;
  }

  getCameras(): CameraModel[] {
    return this.cameras;
  }
}
