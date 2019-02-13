import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { GroupModel } from './group.model';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { GroupBean } from './group.bean';
import { RequestUtil } from '../request.util';

@Injectable({
  providedIn: 'root',
})
export class GroupService {

  constructor(private client: HttpClient, private userService: UserService) {
  }

  private static readonly BASE_GROUP_URL = environment.serverUrl + '/v1/groups';

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

  private static getGroupUrl(groupId: string): string {
    return this.BASE_GROUP_URL + '/' + groupId;
  }

  private static getMemberUrl(groupId: string, userId?: string): string {
    const memeberUrl = this.getGroupUrl(groupId) + '/member';
    if (userId) {
      return memeberUrl + '/' + userId;
    }
    return memeberUrl;
  }

  private static getOwnerUrl(groupId: string, newOwnerId: string): string {
    return this.getGroupUrl(groupId) + '/owner/' + newOwnerId;
  }

  private static getGroupCameraUrl(groupId: string, cameraId?: string): string {
    const cameraUrl = this.getGroupUrl(groupId) + '/cameras';
    if (cameraId) {
      return cameraUrl + '/' + cameraId;
    }
    return cameraUrl;
  }

  private getUserGroupsUrl(userId: string) {
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

  addUserToGroup(): Promise<GroupModel> {
    return Promise.reject('Not complete');
  }

  removeUserFromGroup(): Promise<GroupModel> {
    return Promise.reject('Not complete');
  }

  changeOwnerOfGroup(): Promise<GroupModel> {
    return Promise.reject('Not complete');
  }

  addCameraToGroup(): Promise<GroupModel> {
    return Promise.reject('Not complete');
  }

  removeCameraFromGroup(): Promise<GroupModel> {
    return Promise.reject('Not complete');
  }
}
