import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { CamerasComponent } from './page/cameras/cameras.component';
import { ViewCameraComponent } from './page/view-camera/view-camera.component';
import { UserGroupsComponent } from './page/user-groups/user-groups.component';
import { UserSettingsComponent } from './page/user-settings/user-settings.component';
import { StatisticsComponent } from './page/statistics/statistics.component';
import { ManageCameraSharingComponent } from './page/manage-camera-sharing/manage-camera-sharing.component';
import { ManageUserGroupComponent } from './page/manage-user-group/manage-user-group.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', redirectTo: 'login'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'home', component: DashboardComponent},
  {path: 'cameras', component: CamerasComponent},
  {path: 'cameras/:id', component: ViewCameraComponent},
  {path: 'cameras/:id/sharing', component: ManageCameraSharingComponent},
  {path: 'groups', component: UserGroupsComponent},
  {path: 'groups/:id', component: ManageUserGroupComponent},
  {path: 'settings', component: UserSettingsComponent},
  {path: 'statistics', component: StatisticsComponent},
  {path: 'stats', component: StatisticsComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
