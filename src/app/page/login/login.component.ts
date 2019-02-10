import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/api/user/user.service';
import { Router } from '@angular/router';

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
        switch (error) {
          case '403':
            this.errorMessage = 'email/password combination invalid';
            break;
          default:
            this.errorMessage = error;
        }
      }
    );
  }
}
