import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { GroupModel } from './group.model';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { GroupBean } from './group.bean';
import { RequestUtil } from '../request.util';
import { UserModel } from '../user/user.model';

@Injectable({
  providedIn: 'root',
})
export class GroupService {

  constructor(public client: HttpClient, public userService: UserService) {
  }

  public static readonly BASE_GROUP_URL = environment.serverUrl + '/v1/groups';

  groups: GroupModel[];

  public static mapFromBean(bean: GroupBean): GroupModel {
    return new GroupModel(
      bean.id,
      bean.name,
      bean.ownedBy,
      bean.users,
      bean.cameras
    );
  }

  public static getGroupUrl(groupId: string): string {
    return this.BASE_GROUP_URL + '/' + groupId;
  }

  public static getMemberUrl(groupId: string, userId?: string): string {
    const memeberUrl = this.getGroupUrl(groupId) + '/member';
    if (userId !== undefined) {
      return memeberUrl + '/' + userId;
    }
    return memeberUrl;
  }

  public static getOwnerUrl(groupId: string, newOwnerId: string): string {
    return this.getGroupUrl(groupId) + '/owner/' + newOwnerId;
  }

  public static getGroupCameraUrl(groupId: string, cameraId?: string): string {
    const cameraUrl = this.getGroupUrl(groupId) + '/cameras';
    if (cameraId) {
      return cameraUrl + '/' + cameraId;
    }
    return cameraUrl;
  }

  public getUserGroupsUrl(userId: string) {
    return environment.serverUrl + '/v1/users/' + userId + '/groups';
  }

  createGroup(groupName: string): Promise<GroupModel> {
    const newGroup = new GroupModel(null, groupName, null, null, null);
    return this.client.post<BackendModel<GroupModel>>(GroupService.BASE_GROUP_URL, newGroup, {
      observe: 'response',
      headers: RequestUtil.generateAuthHeaders(this.userService)
    }).toPromise()
      .then(response => {
        if (response.status === 201) {
          return response.body.data;
        }
        throw response.status;
      });
  }

  getUserGroups(): Promise<GroupModel[]> {
    return this.userService.getLoggedIn().then(user => {
      return this.client.get<BackendModel<GroupBean[]>>(this.getUserGroupsUrl(user.getId()), {
        observe: 'response',
        headers: RequestUtil.generateAuthHeaders(this.userService)
      }).toPromise();
    })
      .then(response => {
        if (response.status === 200) {
          return response.body.data;
        }
        throw response.status;
      }).then(beans => {
        const models = [];
        for (const bean of beans) {
          models.push(GroupService.mapFromBean(bean));
        }
        return models;
      });
  }

  getGroupById(groupId: string): Promise<GroupModel> {
    return this.client.get<BackendModel<GroupBean>>(GroupService.getGroupUrl(groupId), {
      observe: 'response',
      headers: RequestUtil.generateAuthHeaders(this.userService)
    }).toPromise()
      .then(response => {
        if (response.status === 200) {
          return response.body.data;
        }
        throw response.status;
      })
      .then(groupBean => GroupService.mapFromBean(groupBean));
  }

  addUserToGroup(groupId: string, userEmail: string): Promise<GroupModel> {
    const user = new UserModel(null, null, null, userEmail, null, null);
    return this.client.post<BackendModel<GroupBean>>(GroupService.getMemberUrl(groupId), user, {
      observe: 'response',
      headers: RequestUtil.generateAuthHeaders(this.userService)
    }).toPromise().then(response => {
      if (response.status === 202) {
        return response.body.data;
      }
      throw response.status;
    }).then(bean => GroupService.mapFromBean(bean));
  }

  removeUserFromGroup(groupId: string, userId: string): Promise<boolean> {
    return this.client.delete(GroupService.getMemberUrl(groupId, userId), {
      observe: 'response',
      headers: RequestUtil.generateAuthHeaders(this.userService)
    }).toPromise()
      .then(response => {
        if (response.status === 202) {
          return true;
        } else if (response.status === 404) {
          return false;
        } else {
          throw response.status;
        }
      });
  }

  deleteGroup(groupId: string): Promise<boolean> {
    return this.client.delete(GroupService.getGroupUrl(groupId), {
      observe: 'response',
      headers: RequestUtil.generateAuthHeaders(this.userService)
    }).toPromise()
      .then(response => {
        if (response.status === 202) {
          return true;
        } else if (response.status === 404) {
          return false;
        } else {
          throw response.status;
        }
      });
  }

  changeOwnerOfGroup(): Promise<GroupModel> {
    return Promise.reject('Not complete');
  }

  addCameraToGroup(groupId: string, cameraId: string): Promise<GroupModel> {
    return this.client.post<BackendModel<GroupBean>>(GroupService.getGroupCameraUrl(groupId, cameraId), null, {
      observe: 'response',
      headers: RequestUtil.generateAuthHeaders(this.userService)
    }).toPromise().then(response => {
      if (response.status === 202) {
        return response.body.data;
      }
      throw response.status;
    }).then(bean => GroupService.mapFromBean(bean));
  }

  removeCameraFromGroup(groupId: string, cameraId: string): Promise<void> {
    return this.client.delete(GroupService.getGroupCameraUrl(groupId, cameraId), {
      observe: 'response',
      headers: RequestUtil.generateAuthHeaders(this.userService)
    }).toPromise().then(response => {
      if (response.status === 202) {
        return Promise.resolve();
      }
      throw response.status;
    });
  }
}
