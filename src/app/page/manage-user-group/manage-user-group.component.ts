import { Component } from '@angular/core';
import { GroupModel } from '../../shared/api/group/group.model';
import { UserModel } from '../../shared/api/user/user.model';
import { UserDependantComponent } from '../../shared/component/user-dependant.component';
import { CameraModel } from '../../shared/api/camera/camera.model';
import { Router } from '@angular/router';
import { UserService } from '../../shared/api/user/user.service';
import { CameraService } from '../../shared/api/camera/camera.service';
import { GroupService } from '../../shared/api/group/group.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { CameraToGroupsComponent } from '../../dialog/camera-to-groups/camera-to-groups.component';
import { HttpErrorResponse } from '@angular/common/http';
import { InviteUserComponent } from '../../dialog/invite-user/invite-user.component';
import { InviteType, InviteUserConfig } from '../../dialog/invite-user/invite-user.config';
import { CameraToGroupsConfig } from '../../dialog/camera-to-groups/camera-to-groups.config';
import { RemoveCameraComponent } from '../../dialog/remove-camera/remove-camera.component';

@Component({
  selector: 'app-manage-user-group',
  templateUrl: './manage-user-group.component.html',
  styleUrls: ['./manage-user-group.component.styl']
})
export class ManageUserGroupComponent extends UserDependantComponent {

  cameras: CameraModel[];
  members: UserModel[];
  groupNotFound: boolean;
  private readonly groupId: string;
  private group: GroupModel;

  constructor(
    router: Router,
    userService: UserService,
    dialog: MatDialog,
    snackBar: MatSnackBar,
    private cameraService: CameraService,
    private groupService: GroupService) {
    super(userService, router, dialog, snackBar);
    this.user = null;
    this.group = null;
    this.cameras = [];
    this.members = [];

    const url = this.router.url;
    const segments = url
      .split('/')
      .map(segment => {
        if (segment.includes('?')) {
          return segment.split('?')[0];
        }
        return segment;
      })
      .filter(segment => segment.length > 0);

    this.groupId = segments[segments.length - 1];
  }

  inInit(): Promise<void> {
    this.groupNotFound = false;
    return this.groupService.getGroupById(this.groupId)
      .then(groupModel => {
        const promiseTrain = [];
        this.group = groupModel;

        for (const userId of groupModel.getMembers()) {
          promiseTrain.push(this.userService.getUser(userId));
        }

        for (const cameraId of groupModel.getCameras()) {
          promiseTrain.push(this.cameraService.getCamera(cameraId));
        }
        return Promise.all(promiseTrain);
      })
      .then(returnedData => {
        this.members = [];
        this.cameras = [];
        for (const model of returnedData) {
          if (model instanceof UserModel) {
            this.members.push(<UserModel>model);
          } else {
            this.cameras.push(<CameraModel>model);
          }
        }
      })
      .catch(rejected => {
        console.error(rejected);
        if (rejected instanceof HttpErrorResponse) {
          const status = (<HttpErrorResponse>rejected).status;
          if (status === 404) {

          }
        }
        this.groupNotFound = true;
      });
  }

  getOwnerName(ownerId: string): string {
    if (ownerId === this.user.getId()) {
      return 'you';
    }
    for (const member of this.members) {
      if (member.getId() === ownerId) {
        return member.getFormattedName();
      }
    }
    return 'unknown';
  }

  addCamera(): void {
    const ownedCameras = this.cameraService.getOwnedCameras()
      .then(cameras => cameras.filter(camera => camera.getOwnedBy().startsWith(this.user.getId())));

    const dialogConfig = new CameraToGroupsConfig(ownedCameras, this.groupId);
    const addCamera = this.dialog.open(CameraToGroupsComponent, {
      data: dialogConfig,
      width: '512px'
    });

    addCamera.afterClosed().toPromise().then(() => this.inInit());
  }

  addMember(): void {
    const addMember = this.dialog.open(InviteUserComponent, {
      width: '50%',
      data: new InviteUserConfig(true, InviteType.GROUP, this.group.getId()),
    });

    addMember.afterClosed().toPromise().then(() => {
      this.inInit();
    });
  }

  memberClicked(event: string, memberId: string) {
    console.log(event, memberId);
  }

  cameraClicked(event: string, cameraId: string) {
    console.log(event, cameraId);
    switch (event) {
      case 'view':
      case 'clicked':
        this.router.navigate(['/cameras/' + cameraId], {queryParams: {view: event}});
        break;
      case 'remove':
        const openDialog = this.dialog.open(RemoveCameraComponent, {
          data: {
            cameraId: cameraId,
            groupId: this.groupId
          }
        });
        openDialog.afterClosed().toPromise().then(() => {
          this.cameras = this.cameras.filter(camera => camera.getId() !== cameraId);
        });
    }
  }
}
