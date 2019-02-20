import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/api/user/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  errorMessage: string;

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit() {
  }

  attemptLogin(): void {
    this.userService.login(this.email, this.password).then(
      () => {
        this.router.navigate(['/dashboard']);
      },
      error => {
        console.log('Got error');
        console.error(error);
        if (error instanceof HttpErrorResponse) {
          const httpError = <HttpErrorResponse>error;
          if (httpError.status === 403) {
            this.errorMessage = 'email/password combination invalid';
          } else {
            this.errorMessage = error.toLocaleString();
          }
        } else {
          this.errorMessage = error.toLocaleString();
        }
      }
    );
  }
}
