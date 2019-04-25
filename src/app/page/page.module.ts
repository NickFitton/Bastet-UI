import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../shared/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule, MatProgressSpinnerModule } from '@angular/material';
import { LoginComponent } from './login/login.component';
import { UserGroupsComponent } from './user-groups/user-groups.component';
import { CamerasComponent } from './cameras/cameras.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ViewCameraComponent } from './view-camera/view-camera.component';
import { ManageUserGroupComponent } from './manage-user-group/manage-user-group.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { ManageCameraSharingComponent } from './manage-camera-sharing/manage-camera-sharing.component';
import { ComponentsModule } from '../shared/component/components.module';
import { NotFoundComponent } from '../not-found/not-found.component';
import { GoogleChartsModule } from 'angular-google-charts';

@NgModule({
  declarations: [
    CamerasComponent,
    DashboardComponent,
    LoginComponent,
    ManageCameraSharingComponent,
    ManageUserGroupComponent,
    StatisticsComponent,
    UserGroupsComponent,
    UserSettingsComponent,
    ViewCameraComponent,
    NotFoundComponent,
  ],
  entryComponents: [
    CamerasComponent,
    DashboardComponent,
    LoginComponent,
    ManageCameraSharingComponent,
    ManageUserGroupComponent,
    StatisticsComponent,
    UserGroupsComponent,
    UserSettingsComponent,
    ViewCameraComponent,
    NotFoundComponent,
  ],
  imports: [
    ComponentsModule,
    FormsModule,
    FlexLayoutModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    GoogleChartsModule.forRoot(),
  ]
})
export class PageModule {
}
