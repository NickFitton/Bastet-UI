import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/api/user/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { UserModel } from '../../shared/api/user/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl'],
  animations: [
    trigger('growIn', [
      transition(':enter', [
        style({
          opacity: 0,
          height: '0px'
        }),
        animate('0.5s', style({
          opacity: 1,
          height: '*'
        })),
      ]),
      transition(':leave', [
        style({
          opacity: 1,
          height: '*'
        }),
        animate('0.5s', style({
          opacity: 0,
          height: '0px'
        })),
      ])
    ]),
    trigger('loadLogo', [
      transition(':enter', [
        style({
          opacity: 0
        }),
        animate('0.5s', style({
          opacity: 1
        })),
      ]),
      transition(':leave', [
        style({
          opacity: 1
        }),
        animate('0.5s', style({
          opacity: 0
        })),
      ])
    ]),
    trigger('loadForm', [
      transition(':enter', [
        animate('1s', keyframes([
          style({opacity: 0, height: 0}),
          style({opacity: 0, height: 0}),
          style({opacity: 1, height: '*'})
        ])),
      ]),
      transition(':leave', [
        style({
          opacity: 1
        }),
        animate('0.5s', style({
          opacity: 0
        })),
      ])
    ]),
  ]
})
export class LoginComponent implements OnInit {

  private readonly LOGIN_STATE: string = 'Login';
  private readonly REGISTER_STATE: string = 'Register';

  firstName: string;
  lastName: string;
  email: string;
  password: string;
  errorMessages: string[];

  state: string;
  nextState: string;

  constructor(private router: Router, private userService: UserService) {
    this.state = this.LOGIN_STATE;
    this.nextState = this.REGISTER_STATE;
    this.errorMessages = [];
  }

  ngOnInit() {
  }

  toggleState() {
    if (this.state === this.LOGIN_STATE) {
      this.state = this.REGISTER_STATE;
      this.nextState = this.LOGIN_STATE;
    } else {
      this.state = this.LOGIN_STATE;
      this.nextState = this.REGISTER_STATE;
    }
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
            this.errorMessages = ['email/password combination invalid'];
          } else {
            this.errorMessages = [error.toLocaleString()];
          }
        } else {
          this.errorMessages = [error.toLocaleString()];
        }
      }
    );
  }

  attemptRegister() {
    this.userService.createUser(new UserModel(null, this.firstName, this.lastName, this.email, this.password, null))
      .then(() => this.userService.login(this.email, this.password))
      .then(() => this.router.navigate(['/dashboard']),
        error => {
          if (error instanceof HttpErrorResponse) {
            const httpErrorResponse = <HttpErrorResponse>error;
            if (httpErrorResponse.status === 409) {
              this.errorMessages = ['Email address already registered'];
              // this.dialog.open(ErrorComponent, {
              //   data: new ErrorConfig(
              //     'Email in use',
              //     'The email address you provided is already used by another account, please try again with a different email')
              // });
            } else if (httpErrorResponse.status === 400) {
              this.errorMessages = error.error.error;
            }
          } else {
            alert(error);
          }
        });
  }

  clearErrors(input: string) {
    this.errorMessages = this.errorMessages.filter(message => !message.toLowerCase().includes(input.toLowerCase()));
  }
}
