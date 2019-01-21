import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.styl']
})
export class RegisterComponent implements OnInit {

  reason: string;
  otherReason: string;
  otherReasonLength: number;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.reason = '';
    this.otherReason = '';
    this.otherReasonLength = 32;
  }

  attemptRegister() {
    this.router.navigate(['/dashboard']);
  }
}
