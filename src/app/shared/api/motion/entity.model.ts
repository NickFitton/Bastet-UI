export class EntityModel {
  public readonly x: number;
  public readonly y: number;
  public readonly width: number;
  public readonly height: number;
  public type: string;

  constructor(x: number, y: number, width: number, height: number, type: string) {
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

  getType(): string {
    return this.type;
  }
}
