import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { TimeFrameComponent } from './dialog/timeframe/time-frame.component';
import { LoginComponent } from './page/login/login.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { CamerasComponent } from './page/cameras/cameras.component';
import { UserGroupsComponent } from './page/user-groups/user-groups.component';
import { StatisticsComponent } from './page/statistics/statistics.component';
import { AddCameraComponent } from './dialog/add-camera/add-camera.component';
import { ViewCameraComponent } from './page/view-camera/view-camera.component';
import { ManageUserGroupComponent } from './page/manage-user-group/manage-user-group.component';
import { StatGraphComponent } from './shared/component/stat-graph/stat-graph.component';
import { UserSettingsComponent } from './page/user-settings/user-settings.component';
import { ManageCameraSharingComponent } from './page/manage-camera-sharing/manage-camera-sharing.component';
import { CameraToGroupsComponent } from './dialog/camera-to-groups/camera-to-groups.component';
import { InviteUserComponent } from './dialog/invite-user/invite-user.component';
import { ToolbarComponent } from './shared/component/toolbar/toolbar.component';
import { RegisterComponent } from './page/register/register.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BoxComponent } from './shared/component/box/box.component';
import { LeaveGroupComponent } from './dialog/leave-group/leave-group.component';

@NgModule({
  declarations: [
    AppComponent,
    TimeFrameComponent,
    LeaveGroupComponent,
    LoginComponent,
    DashboardComponent,
    CamerasComponent,
    UserGroupsComponent,
    StatisticsComponent,
    AddCameraComponent,
    ViewCameraComponent,
    ManageUserGroupComponent,
    StatGraphComponent,
    UserSettingsComponent,
    ManageCameraSharingComponent,
    CameraToGroupsComponent,
    InviteUserComponent,
    ToolbarComponent,
    RegisterComponent,
    BoxComponent
  ],
  entryComponents: [
    TimeFrameComponent,
    LeaveGroupComponent,
    InviteUserComponent,
  ],
  imports: [
    FormsModule,
    FlexLayoutModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
