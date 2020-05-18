import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../users.service';
import {Subscription} from 'rxjs';
import {User} from '../../models/user.model';
import {ActivatedRoute} from '@angular/router';
import {cloneDeep} from 'lodash';
import {USER_FORM_JSON} from '../../models/user-form.config';
import {FormJSON} from '../../../form-wrapper/models/form.data';
import {UserData} from '../../models/user.data';
import {Location} from '@angular/common';

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html'
})
export class UsersDetailsComponent implements OnInit {

  routeSub: Subscription;
  user: User;
  userFormValue: UserData;
  readOnlyMode = true;

  formJson: FormJSON;

  constructor(private usersService: UsersService, private route: ActivatedRoute, private location: Location) {
  }

  ngOnInit() {
    this.formJson = cloneDeep(USER_FORM_JSON);
    this.formJson.rows[1].columns[1].options = this.usersService.getUserRoles();

    this.routeSub = this.route.params.subscribe(res => {
      if (res && res.id) {
        this.usersService.getUser(res.id).then(user => {
          this.user = cloneDeep(user);
          this.userFormValue = cloneDeep(this.user.toJSON());
        });
      }
    });
  }

  toggleReadOnly() {
    this.readOnlyMode = !this.readOnlyMode;
  }

  back() {
    this.location.back();
  }

  handleFormAction(event) {
    if (event === 'save') {
      this.updateUser();
    } else if (event === 'edit') {
      this.toggleReadOnly();
    } else {
      this.back();
    }
  }

  handleFormChange(event) {
    this.userFormValue = cloneDeep(event);
  }

  private updateUser() {
    const user: UserData = cloneDeep(this.userFormValue);
    user.id = this.user.id;

    this.usersService.updateUser(new User(user))
      .then(() => {
        this.back();
      });
  }

}
