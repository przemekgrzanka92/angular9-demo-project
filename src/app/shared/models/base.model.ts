import {BaseData} from './base.data';

export declare class BaseModel<T extends BaseData> {
  protected data: T;
  readonly id: number | string;
  constructor(data: T);
  toJSON(): any;
}
