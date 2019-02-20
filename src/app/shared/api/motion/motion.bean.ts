import { EntityBean } from './entity.bean';

export interface MotionBean {
  id: string;
  cameraId: string;
  entryTime: string;
  exitTime: string;
  imageTime: string;
  createdAt: string;
  updatedAt: string;
  fileExists: true;
  imageEntities: EntityBean[];
}
