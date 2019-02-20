import { EntityType } from './entity.bean';

export class EntityModel {
  private readonly x: number;
  private readonly y: number;
  private readonly width: number;
  private readonly height: number;
  private type: EntityType;

  constructor(x: number, y: number, width: number, height: number, type: EntityType) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type;
  }

  getX(): number {
    return this.x;
  }

  getY(): number {
    return this.y;
  }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }

  getType(): EntityType {
    return this.type;
  }
}
