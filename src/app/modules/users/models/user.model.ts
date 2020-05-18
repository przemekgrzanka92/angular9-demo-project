import {UserData} from './user.data';
import {BaseModel} from '../../../shared/models/base.model';

export class User extends BaseModel<UserData> {

  get firstName(): string {
    return this.data && this.data.firstName;
  }

  set fistName(val: string) {
    this.data.firstName = val;
  }

  get lastName(): string {
    return this.data && this.data.lastName;
  }

  set lastName(val: string) {
    this.data.lastName = val;
  }

  get email(): string {
    return this.data && this.data.email;
  }

  set email(val: string) {
    this.data.email = val;
  }

  get role(): string {
    return this.data && this.data.role;
  }

  set role(val: string) {
    this.data.role = val;
  }


  constructor(data: UserData) {
    super(data);
  }

}
