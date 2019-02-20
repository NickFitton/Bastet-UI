import { NgModule } from '@angular/core';
import { TimeFrameComponent } from './timeframe/time-frame.component';
import { ErrorComponent } from './error/error.component';
import { LeaveGroupComponent } from './leave-group/leave-group.component';
import { AddCameraComponent } from './add-camera/add-camera.component';
import { ShareCameraComponent } from './share-camera/share-camera.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { CameraToGroupsComponent } from './camera-to-groups/camera-to-groups.component';
import { InviteUserComponent } from './invite-user/invite-user.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../shared/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material';

@NgModule({
  declarations: [
    TimeFrameComponent,
    ErrorComponent,
    LeaveGroupComponent,
    AddCameraComponent,
    ShareCameraComponent,
    CreateGroupComponent,
    CameraToGroupsComponent,
    InviteUserComponent,
  ],
  entryComponents: [
    AddCameraComponent,
    ShareCameraComponent,
    CreateGroupComponent,
    ErrorComponent,
    TimeFrameComponent,
    LeaveGroupComponent,
    InviteUserComponent,
    CameraToGroupsComponent,
  ],
  imports: [
    FormsModule,
    FlexLayoutModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
  ]
})
export class DialogModule {
}
