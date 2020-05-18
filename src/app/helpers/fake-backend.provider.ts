import {Injectable} from '@angular/core';
import {HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {delay, mergeMap, materialize, dematerialize} from 'rxjs/operators';
import {USERS} from './users';
import {UserData} from '../modules/users/models/user.data';

let users: UserData[] = USERS;

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const {url, method, headers, body} = request;

    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('/users') && method === 'GET':
          return getUsers();
        case url.endsWith('/users') && method === 'POST':
          return createUser(body);
        case splitUrl(url) && method === 'GET':
          return getUser(idFromUrl());
        case splitUrl(url) && method === 'POST':
          return createUser(body);
        case splitUrl(url) && method === 'PUT':
          return editUser(body);
        case splitUrl(url) && method === 'DELETE':
          return deleteUser();
        default:
          return next.handle(request);
      }
    }

    function getUsers() {
      return ok(users);
    }

    function getUser(id) {
      return ok(users.find(user => user.id === id));
    }

    function createUser(user: UserData) {
      users.push(user);
      return ok(user);
    }

    function editUser(updatedUser: UserData) {
      const index = users.findIndex(user => user.id === updatedUser.id);

      if (index !== -1) {
        users[index] = updatedUser;
      }

      return ok(updatedUser);
    }

    function deleteUser() {
      users = users.filter(x => x.id !== idFromUrl());
      return ok();
    }

    function ok(reqData?) {
      return of(new HttpResponse({status: 200, body: reqData}));
    }

    function splitUrl(urlString: string) {
      return urlString.split('/users/') && url.split('/users/').length === 2;
    }

    function idFromUrl() {
      return url.split('/users/')[1];
    }
  }
}

export const fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
