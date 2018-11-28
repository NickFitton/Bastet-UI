export class Metadata {
  id: string;
  entryTime: Date;
  exitTime: Date;
  imageTime: Date;
  createdAt: Date;
  updatedAt: Date;
  fileExists: Boolean;
  fill: string;
  row: number;

  constructor(model: MetadataModel) {
    this.id = model.id;
    this.entryTime = new Date(model.entryTime);
    this.exitTime = new Date(model.exitTime);
    this.imageTime = new Date(model.imageTime);
    this.createdAt = new Date(model.createdAt);
    this.updatedAt = new Date(model.updatedAt);
    this.fileExists = model.fileExists;
    this.fill = `#${model.id.substring(0, 6).toUpperCase()}`;
    this.row = 0;
  }
}
