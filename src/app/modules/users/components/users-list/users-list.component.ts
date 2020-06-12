import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {Router} from '@angular/router';
import {UsersService} from '../../users.service';
import {cloneDeep} from 'lodash';
import {Subscription} from 'rxjs';
import {ListConfig} from '../../../../shared/models/list.data';
import {Location} from '@angular/common';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html'
})
export class UsersListComponent implements OnInit, OnDestroy {

  listConfig: ListConfig = {
    fieldNames: [
      {fieldName: 'email', label: 'Email'},
      {fieldName: 'firstName', label: 'First Name'},
      {fieldName: 'lastName', label: 'Last Name'},
      {fieldName: 'role', label: 'Role'}
    ],
    actions: [
      {actionName: 'details', label: 'Details'},
      {actionName: 'delete', label: 'Delete'}
    ]
  };

  users: User[] = [];
  usersSub: Subscription;

  constructor(private router: Router, private usersService: UsersService, public location: Location) {
  }

  ngOnInit(): void {
    this.usersService.getUsers().subscribe(res => {
      if (res) {
        this.users = cloneDeep(res);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.usersSub) {
      this.usersSub.unsubscribe();
    }
  }

  handleListAction(event) {
    switch (event.actionName) {
      case 'details': {
        this.router.navigate(['/users/' + event.item.id]);
        break;
      }

      case 'delete': {
        this.deleteUser(event.item);
        break;
      }
    }
  }

  private deleteUser(user: User) {
    this.usersService.removeUser(user.id);
  }

}
