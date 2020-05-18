import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserData} from './models/user.data';
import {catchError, map} from 'rxjs/operators';
import {User} from './models/user.model';
import {BehaviorSubject, Observable} from 'rxjs';

const USER_ROLES: {label: string, value: string}[] = [
  {label: 'Admin', value: 'ROLE_ADMIN'},
  {label: 'User', value: 'ROLE_USER'}
];

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  protected apiUrl = '/users';

  private users$: Observable<User[]>;
  private usersSubject = new BehaviorSubject(null);
  private users: User[] = [];

  constructor(private httpClient: HttpClient) {
  }

  getUserRoles() {
    return USER_ROLES;
  }

  getUser(userId: string): Promise<User> {
    return this.httpClient
      .get(this.apiUrl + '/' + userId)
      .pipe(
        map((res: UserData) => {
          return new User(res);
        })
      )
      .toPromise();
  }

  createNewUser(user: User) {
    return this.httpClient
      .post(this.apiUrl, user.toJSON())
      .pipe(
        map((res: UserData) => {
          const newUser = new User(res);

          this.users.push( new User(user));
          this.usersSubject.next(this.users);
          return newUser;
        })
      )
      .toPromise();
  }

  updateUser(updatedUser: User) {
    return this.httpClient
      .put(this.apiUrl + '/' + updatedUser.id, updatedUser.toJSON())
      .pipe(
        map(() => {
          const index = this.users.findIndex(user => user.id === updatedUser.id);

          if (index !== -1) {
            this.users[index] = updatedUser;
            this.usersSubject.next(this.users);
          }

          return true;
        })
      )
      .toPromise();
  }

  removeUser(userId: string | number) {
    return this.httpClient
      .delete(this.apiUrl + '/' + userId, {})
      .pipe(
        map(() => {
          const index = this.users.findIndex(item => item.id === userId);
          if (index !== -1) {
            this.users.splice(index, 1);
            this.usersSubject.next(this.users);
            return true;
          } else {
            return false;
          }
        })
      )
      .toPromise();
  }

  getUsers(): Observable<User[]> {
    if (!this.users$) {
      this._initUsersObservable().then(() => {
      });
    }
    return this.users$;
  }

  getAllUsers(): Promise<User[]> {
    return this.httpClient
      .get(this.apiUrl)
      .pipe(
        map((data: UserData[]) => {
          return data ? data.map(item => new User(item)) : [];
        }),
        catchError(err => {
          console.log(err);
          return [];
        })
      )
      .toPromise();
  }

  private _initUsersObservable(): Promise<User[]> {
    this.users$ = this.usersSubject.asObservable();
    return this.getAllUsers().then(list => {
      if (!list) {
        list = [];
      }
      this.usersSubject.next(list);
      this.users = list;
      return list;
    });
  }

}
