import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { UserModel } from './user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserBean } from './user.bean';
import { RequestUtil } from '../request.util';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loggedInUser: UserModel;
  public readonly TOKEN = 'auth_token';
  public readonly BASE_USER_URL = environment.serverUrl + '/v1/users';
  public readonly USER_LOGIN_URL = environment.serverUrl + '/v1/login/user';

  constructor(public client: HttpClient) {
  }

  static mapFromBean(bean: UserBean): UserModel {
    return new UserModel(
      bean.id,
      bean.firstName,
      bean.lastName,
      bean.email,
      bean.password,
      new Date(bean.createdAt));
  }

  createUser(user: UserModel): Promise<UserModel> {
    return this.client.post<BackendModel<UserModel>>(this.BASE_USER_URL, user, {observe: 'response'}).toPromise()
      .then(response => {
        if (response.status === 201) {
          return response.body.data;
        } else if (response.status === 400) {
          console.log('Throwing error body');
          throw response.body.error;
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

  updateUser(user: UserModel): Promise<UserModel> {
    return this.client.patch<BackendModel<UserBean>>(this.getUserUrl(user.getId()), user, {
      observe: 'response',
      headers: this.generateAuthHeaders()
    }).toPromise()
      .then(response => {
        if (response.status !== 202) {
          throw response.status;
        }
        return response.body.data;
      }).then(userBean => UserService.mapFromBean(userBean));
  }

  updateUserPassword(userId: string, currentPassword: string, newPassword: string): Promise<UserModel> {
    return this.client.patch<BackendModel<UserBean>>(this.getUserUrl(userId) + '/password',
      {
        'currentPassword': currentPassword,
        'newPassword': newPassword
      }, {
        observe: 'response',
        headers: this.generateAuthHeaders()
      }).toPromise()
      .then(response => {
        if (response.status !== 202) {
          throw response.status;
        }
        return response.body.data;
      }).then(userBean => UserService.mapFromBean(userBean));
  }

  logOut(): void {
    this.loggedInUser = null;
    sessionStorage.clear();
  }

  getUser(userId: string): Promise<UserModel> {
    return this.client
      .get<BackendModel<UserBean>>(this.getUserUrl(userId), {
        observe: 'response',
        headers: RequestUtil.generateAuthHeaders(this)
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

  public getUserUrl(userId: string): string {
    return this.BASE_USER_URL + '/' + userId;
  }

  public generateAuthHeaders(): HttpHeaders {
    return new HttpHeaders({'authorization': 'Token ' + this.getToken()});
  }
}
