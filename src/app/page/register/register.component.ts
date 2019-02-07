import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/api/user/user.service';
import { UserModel } from '../../shared/api/user/user.model';

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

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.reason = '';
    this.otherReason = '';
    this.otherReasonLength = 32;
  }

  attemptRegister() {
    this.userService.createUser(new UserModel(null, this.firstName, this.lastName, this.email, this.password, null))
      .subscribe(
        next => {
          this.router.navigate(['/dashboard']);
        },
        error => {
          alert(error);
        });
  }
}
