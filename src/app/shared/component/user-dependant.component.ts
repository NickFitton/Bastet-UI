import { UserService } from '../api/user/user.service';
import { UserModel } from '../api/user/user.model';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { LeaveGroupComponent } from '../../dialog/leave-group/leave-group.component';
import { LeaveGroupConfig } from '../../dialog/leave-group/leave-group-config.model';
import { MatDialog, MatSnackBar } from '@angular/material';
import { StatusEnum } from './status.enum';
import { Status } from 'tslint/lib/runner';

export abstract class UserDependantComponent implements OnInit {

  protected user: UserModel;
  protected userService: UserService;
  protected router: Router;
  protected dialog: MatDialog;
  protected snackBar: MatSnackBar;

  protected constructor(
    userService: UserService,
    router: Router,
    dialog: MatDialog,
    snackBar: MatSnackBar) {
    this.user = null;
    this.userService = userService;
    this.router = router;
    this.dialog = dialog;
    this.snackBar = snackBar;
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
    const url = this.router.url;
    const params = url.split('?')[1];
    let status: string[];
    if (params !== undefined) {
      status = params.split('and').filter(param => param.includes('status='));
    } else {
      status = [];
    }
    if (status.length === 1) {
      const astatus = status[0].split('=')[1];
      const aEnum = StatusEnum[astatus];
      console.log(aEnum);
      switch (aEnum) {
        case StatusEnum.CAMERA_DELETED:
          this.snackBar.open('Camera deleted successfully', null, {
            duration: 2000,
          });
          break;
        case StatusEnum.CAMERA_LEFT:
          this.snackBar.open('Shared camera left successfully', null, {
            duration: 2000,
          });
          break;
        case StatusEnum.GROUP_DELETED:
          this.snackBar.open('Group deleted successfully', null, {
            duration: 2000,
          });
          break;
        case StatusEnum.GROUP_LEFT:
          this.snackBar.open('Group left successfully', null, {
            duration: 2000,
          });
          break;
      }
    } else {
      console.log('No params or too many');
    }
    return Promise.resolve();
  }

  groupClicked(link: string, groupId: string, redirect?: boolean) {
    console.log('Group clicked: ' + groupId);
    console.log(link);
    switch (link) {
      case 'leave':
      case 'delete':
        const dialog = this.dialog.open(LeaveGroupComponent, {
          data: new LeaveGroupConfig(groupId, this.user.getId(), link),
        });
        dialog.afterClosed().toPromise().then(() => {
          if (redirect !== undefined && redirect) {
            this.viewGroup();
          } else {
            this.inInit();
          }
        });
        break;
      case 'view':
      case 'manage':
      default:
        this.viewGroup(groupId);
        break;
    }
  }

  viewGroup(groupId?: string): void {
    if (groupId !== undefined) {
      this.router.navigate(['/groups/' + groupId]);
    } else {
      this.router.navigate(['/groups']);
    }
  }
}
