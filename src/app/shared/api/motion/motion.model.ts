import { EntityModel } from './entity.model';

export class MotionModel {

  public id: string;
  public entryTime: Date;
  public exitTime: Date;
  public imageTime: Date;
  public createdAt: Date;
  public updatedAt: Date;
  public fileExists: boolean;
  public imageEntities: EntityModel[];
  public image: string;

  constructor(
    id: string, entryTime: Date, exitTime: Date, imageTime: Date, createdAt: Date,
    updatedAt: Date, fileExists: boolean, imageEntities: EntityModel[]) {
    this.id = id;
    this.entryTime = entryTime;
    this.exitTime = exitTime;
    this.imageTime = imageTime;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.fileExists = fileExists;
    this.imageEntities = imageEntities;
  }

  getId(): string {
    return this.id;
  }

  getEntryTime(): Date {
    return this.entryTime;
  }

  getExitTime(): Date {
    return this.exitTime;
  }

  getImageTime(): Date {
    return this.imageTime;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  getFileExists(): boolean {
    return this.fileExists;
  }

  getImageEntities(): EntityModel[] {
    return this.imageEntities;
  }

  getImage(): string {
    return this.image;
  }

  setImage(image: string): void {
    this.image = image;
  }
}
