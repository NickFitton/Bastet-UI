import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { UserModel } from './user.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserBean } from './user.bean';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private client: HttpClient) {
  }

  private readonly TOKEN = 'auth_token';

  users: UserModel[];
  loggedInUser: UserModel;

  private readonly BASE_USER_URL = environment.serverUrl + '/v1/users';
  private readonly USER_LOGIN_URL = environment.serverUrl + '/v1/login/user';

  static mapFromBean(bean: UserBean): UserModel {
    return new UserModel(
      bean.id,
      bean.firstName,
      bean.lastName,
      bean.email,
      bean.password,
      bean.createdAt);
  }

  createUser(user: UserModel): Observable<UserModel> {
    return this.client
      .post<BackendModel<UserBean>>(this.BASE_USER_URL, user)
      .pipe(map(response => UserService.mapFromBean(response.data)));
  }

  login(email: string, password: string): Observable<boolean> {
    return this.client.post<BackendModel<string>>(this.USER_LOGIN_URL, undefined, {
      observe: 'response',
      headers: new HttpHeaders({'Authorization': 'Basic ' + btoa(email + ':' + password)})
    })
      .pipe(map(response => {
        if (response.status !== 200) {
          console.error('Failed to login: ' + response.body);
          return false;
        }
        const data = response.body;
        if (data.error) {
          console.error(data.error);
          return false;
        }
        sessionStorage.setItem(this.TOKEN, data.data);
        return true;
      }));
  }

  getSelf(): Observable<UserModel> {
    const sessionToken = sessionStorage.getItem(this.TOKEN);
    if (sessionToken === null) {
      return Observable.throw('No User');
    }

    return this.client
      .get<BackendModel<UserBean>>(this.USER_LOGIN_URL, {
        observe: 'response',
        headers: new HttpHeaders({'Authorization': 'Token ' + sessionToken})
      })
      .pipe(map(response => {
        if (response.status !== 200) {
          return null;
        }
        const data = response.body;
        if (data.error) {
          return null;
        }
        this.loggedInUser = UserService.mapFromBean(data.data);
        return this.loggedInUser;
      }));
  }

  logOut(): void {
    this.loggedInUser = null;
    sessionStorage.clear();
  }

  getLoggedIn(): UserModel {
    if (this.loggedInUser === null || this.loggedInUser === undefined) {
      const currentId = sessionStorage.getItem(this.TOKEN);
      for (const user of this.users) {
        console.log(user.getId(), currentId);
        if (user.getId() === currentId) {
          this.loggedInUser = user;
          return this.loggedInUser;
        }
      }
      return null;
    } else {
      return this.loggedInUser;
    }
  }
}
