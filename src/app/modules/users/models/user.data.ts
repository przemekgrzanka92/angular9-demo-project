import {BaseData} from '../../../shared/models/base.data';

export interface UserData extends BaseData {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}
