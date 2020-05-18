import {Component, OnInit} from '@angular/core';
import {cloneDeep} from 'lodash';
import {FormJSON} from '../../../form-wrapper/models/form.data';
import {USER_FORM_JSON} from '../../models/user-form.config';
import {UsersService} from '../../users.service';
import {UserData} from '../../models/user.data';
import {User} from '../../models/user.model';
import {Location} from '@angular/common';

@Component({
  selector: 'app-users-new',
  templateUrl: './users-new.component.html'
})
export class UsersNewComponent implements OnInit {

  formJson: FormJSON;
  userFormValue: UserData;

  constructor(private location: Location, private usersService: UsersService) {
  }

  ngOnInit() {
    this.formJson = cloneDeep(USER_FORM_JSON);


    this.formJson.rows[1].columns[1].options = this.usersService.getUserRoles();
  }

  save() {
    this.createUser();
  }

  back() {
    this.location.back();
  }

  handleFormChange(event) {
    this.userFormValue = cloneDeep(event);
  }

  handleFormAction(event) {
    if (event === 'save') {
      this.createUser();
    } else {
      this.back();
    }
  }

  private createUser() {
    const user: UserData = cloneDeep(this.userFormValue);
    user.id = Date.now();

    this.usersService.createNewUser(new User(user))
      .then((res) => {
        console.log(res);
        this.back();
      });
  }

}
