import {Component, OnInit} from '@angular/core';
import {ListConfig} from '../../../../shared/components/paginated-list/paginated-list.component';
import {User} from '../../models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html'
})
export class UsersListComponent implements OnInit {

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

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  handleListAction(event) {
    switch (event.actionName) {
      case 'details': {
        this.router.navigate(['/users/' + event.item.id]);
        break;
      }

      case 'delete': {
        // this.toastsService.confirm('Are you sure?', 'Invitation Removal.', () => {
          this.deleteUser(event.item);
        // });
          break;
      }
    }
  }

  private deleteUser(user: User) {

  }

}
