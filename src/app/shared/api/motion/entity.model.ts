export class EntityModel {
  private readonly x: number;
  private readonly y: number;
  private readonly width: number;
  private readonly height: number;
  private type: EntityType;

  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }
}
enum EntityType {
  FULL_BODY,
  UPPER_BODY,
  LOWER_BODY,
  FACE,
  EYE,
  OTHER
}
