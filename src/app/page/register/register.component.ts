import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/api/user/user.service';
import { UserModel } from '../../shared/api/user/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from '../../dialog/error/error.component';
import { ErrorConfig } from '../../dialog/error/error.config';

@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.styl']
})
export class RegisterComponent implements OnInit {

  firstName: string;
  lastName: string;
  email: string;
  password: string;

  reason: string;
  otherReason: string;
  otherReasonLength: number;

  constructor(private router: Router, private userService: UserService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.reason = '';
    this.otherReason = '';
    this.otherReasonLength = 32;
  }

  attemptRegister() {
    this.userService.createUser(new UserModel(null, this.firstName, this.lastName, this.email, this.password, null))
      .then(() => this.userService.login(this.email, this.password))
      .then(() => this.router.navigate(['/dashboard']),
        error => {
          if (error instanceof HttpErrorResponse) {
            const httpErrorResponse = <HttpErrorResponse>error;
            if (httpErrorResponse.status === 409) {
              this.dialog.open(ErrorComponent, {
                data: new ErrorConfig(
                  'Email in use',
                  'The email address you provided is already used by another account, please try again with a different email')});
            } else {
              alert(httpErrorResponse.status);
            }
          } else {
            alert(error);
          }
        });
  }
}
