import { Component, OnInit } from '@angular/core';
import { NotFoundModel } from './not-found.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found-component',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.styl']
})
export class NotFoundComponent implements OnInit {

  options: NotFoundModel[];

  constructor(private router: Router) {
    this.options = [];
    this.options.push(new NotFoundModel('Return home', '/dashboard'));
    this.options.push(new NotFoundModel('Return to the login page', '/login'));
    this.options.push(new NotFoundModel('Contact support', '/help'));
  }

  ngOnInit() {
  }

  optionClicked(option: NotFoundModel) {
    this.router.navigate([option.getValue()]);
  }

}
