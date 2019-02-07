import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { UserModel } from './user.model';
import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: UserModel[];
  loggedInUser: UserModel;

  constructor() {
    if (!environment.production) {
      this.users = [];
      this.users.push(new UserModel('936c54b3-80a3-41ee-af1a-586d0302da2d', 'john', 'doe', 'j.doe@yahoo.co.uk', '1234', new Date(2010, 1, 1)));
      this.users.push(new UserModel('69e20f9b-4d0d-45cf-96bd-af0e5f07863b', 'jane', 'doe', 'janedoe@gmail.com', '4321', new Date(2010, 1, 5)));
      this.users.push(new UserModel('ad29a477-499f-4dcd-9098-75c629be0503', 'nick', 'fitton', 'dev@nfitton.com', 'password', new Date(Date.now())));
    }
  }

  getUsers(): Observable<UserModel> {
    return Observable.create(observer => {
      for (const user of this.users) {
        observer.next(user);
      }
      observer.complete();
    });
  }

  getUser(userId: string): Observable<UserModel> {
    return Observable.create(observer => {
      let found = false;
      for (const user of this.users) {
        if (user.getId() === userId) {
          observer.next(user);
          observer.complete();
          found = true;
          break;
        }
      }
      if (!found) {
        observer.error('404');
      }
    });
  }

  existsByEmail(email: string): Observable<boolean> {
    return Observable.create(observer => {
      let found = false;
      for (const user of this.users) {
        if (user.getEmail() === email) {
          found = true;
          break;
        }
      }
      observer.next(found);
      observer.complete();
    });
  }

  existsById(id: string): Observable<boolean> {
    return Observable.create(observer => {
      let found = false;
      for (const user of this.users) {
        if (user.getId() === id) {
          found = true;
          break;
        }
      }
      observer.next(found);
      observer.complete();
    });
  }

  createUser(user: UserModel): Observable<UserModel> {
    return this.existsByEmail(user.getEmail()).pipe(flatMap(exists => this.createIfNotExist(exists, user)));
  }

  createIfNotExist(exist, user): Observable<UserModel> {
    return Observable.create(observer => {
      if (exist) {
        observer.error('409');
      } else {
        const newUser = new UserModel(
          'uuid', user.getFirstName(), user.getLastName(), user.getEmail(), user.getPassword(), new Date(Date.now()));
        this.users.push(newUser);
        observer.next(newUser);
      }
      observer.complete();
    });
  }

  login(email: string, password: string): Observable<string> {
    return Observable.create(observer => {
      const matchingUsers = this.users.filter(user => user.getEmail() === email && user.getPassword() === password);

      if (matchingUsers.length === 1) {
        this.loggedInUser = matchingUsers[0];
        observer.next('access_token');
      } else {
        observer.error('403');
      }
      observer.complete();
    });
  }

  logOut(): void {
    this.loggedInUser = null;
  }

  getLoggedIn(): UserModel {
    return this.loggedInUser;
  }
}
