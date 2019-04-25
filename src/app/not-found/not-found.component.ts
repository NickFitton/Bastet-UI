import { Component, OnInit } from '@angular/core';
import { NotFoundModel } from './not-found.model';
import { Router } from '@angular/router';
import { UserDependantComponent } from '../shared/component/user-dependant.component';
import { UserService } from '../shared/api/user/user.service';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-not-found-component',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.styl']
})
export class NotFoundComponent extends UserDependantComponent {

  options: NotFoundModel[];

  constructor(
    userService: UserService,
    router: Router,
    dialog: MatDialog,
    snackBar: MatSnackBar) {
    super(userService, router, dialog, snackBar);
    this.options = [];
    this.options.push(new NotFoundModel('Return home', '/home', true));
    this.options.push(new NotFoundModel('Return to the login page', '/', true));
    this.options.push(new NotFoundModel('Contact support', 'mailto:support@nfitton.com', false));
  }

  optionClicked(option: NotFoundModel) {
    this.router.navigate([option.getValue()]);
  }

}
