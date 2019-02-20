import { EntityModel } from './entity.model';

export class MotionModel {

  private id: string;
  private entryTime: Date;
  private exitTime: Date;
  private imageTime: Date;
  private createdAt: Date;
  private updatedAt: Date;
  private fileExists: boolean;
  private imageEntities: EntityModel[];

  constructor(id: string,
  entryTime: Date,
  exitTime: Date,
  imageTime: Date,
  createdAt: Date,
  updatedAt: Date,
  fileExists: boolean,
  imageEntities: EntityModel[]) {
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
}
