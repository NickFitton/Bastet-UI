import { UserService } from '../api/user/user.service';
import { UserModel } from '../api/user/user.model';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

export abstract class UserDependantComponent implements OnInit {

  protected user: UserModel;
  protected userService: UserService;
  protected router: Router;

  protected constructor(userService: UserService, router: Router) {
    this.user = null;
    this.userService = userService;
    this.router = router;
  }

  ngOnInit() {
    this.userService.getLoggedIn().then(loggedInUser => {
        if (loggedInUser === null || loggedInUser === undefined) {
          this.router.navigate(['/login']);
        } else {
          this.user = loggedInUser;
        }
        this.inInit();
      },
      error => {
        if (error instanceof HttpErrorResponse) {
          const httpError = <HttpErrorResponse>error;
          if (httpError.status === 500) {
            this.userService.logOut();
            this.router.navigate(['/']);
          } else {
            alert(httpError.status);
          }
        } else {
          alert(error);
        }
      });
  }

  inInit(): Promise<void> {
    return Promise.resolve();
  }
}
