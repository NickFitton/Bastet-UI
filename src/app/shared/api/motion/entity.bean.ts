export interface EntityBean {
  x: number;
  y: number;
  width: number;
  height: number;
  type: EntityType;
}

export enum EntityType {
  FULL_BODY,
  UPPER_BODY,
  LOWER_BODY,
  FACE,
  EYE,
  OTHER
}
