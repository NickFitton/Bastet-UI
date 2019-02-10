import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { UserModel } from './user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserBean } from './user.bean';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private client: HttpClient) {
  }

  private readonly TOKEN = 'auth_token';

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

  createUser(user: UserModel): Promise<UserModel> {
    return this.client.post<BackendModel<UserModel>>(this.BASE_USER_URL, user, {observe: 'response'}).toPromise()
      .then(response => {
        if (response.status === 201) {
          return response.body.data;
        } else {
          throw response.status;
        }
      });
  }

  login(email: string, password: string): Promise<boolean> {
    return this.client.post<BackendModel<string>>(this.USER_LOGIN_URL, undefined, {
      observe: 'response',
      headers: new HttpHeaders({'Authorization': 'Basic ' + btoa(email + ':' + password)})
    }).toPromise()
      .then(response => {
        if (response.status === 200) {
          const token = response.body.data;
          sessionStorage.setItem(this.TOKEN, token);
          return this.getSelf();
        } else if (response.status === 403) {
          return Promise.resolve(null);
        } else {
          throw response.status;
        }
      }).then(user => {
        if (user === null) {
          return false;
        }
        this.loggedInUser = user;
        return true;
      });
  }

  getSelf(): Promise<UserModel> {
    const sessionToken = sessionStorage.getItem(this.TOKEN);
    if (sessionToken === null) {
      return Promise.reject('No User');
    }

    return this.client
      .get<BackendModel<UserBean>>(this.USER_LOGIN_URL, {
        observe: 'response',
        headers: new HttpHeaders({'Authorization': 'Token ' + sessionToken})
      }).toPromise()
      .then(response => {
        if (response.status !== 200) {
          throw response.status;
        }
        const data = response.body;
        if (data.error) {
          return null;
        }
        return UserService.mapFromBean(data.data);
      });
  }

  logOut(): void {
    this.loggedInUser = null;
    sessionStorage.clear();
  }

  getLoggedIn(): Promise<UserModel> {
    if (this.loggedInUser === null || this.loggedInUser === undefined) {
      const currentId = sessionStorage.getItem(this.TOKEN);
      if (currentId !== null) {
        return this.getSelf();
      }
      return null;
    } else {
      return Promise.resolve(this.loggedInUser);
    }
  }

  getToken(): string {
    return sessionStorage.getItem(this.TOKEN);
  }
}
