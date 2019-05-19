import { CameraModel } from '../../shared/api/camera/camera.model';

export class CameraToGroupsConfig {
  public readonly cameraPromise: Promise<CameraModel[]>;
  public readonly groupId: string;


  constructor(cameraPromise: Promise<CameraModel[]>, groupId: string) {
    this.cameraPromise = cameraPromise;
    this.groupId = groupId;
  }

  getCameraPromise(): Promise<CameraModel[]> {
    return this.cameraPromise;
  }

  getGroupId(): string {
    return this.groupId;
  }
}
