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
import { BarComponent } from './graph/bar/bar.component';

@NgModule({
  declarations: [
    AppComponent,
    BarComponent,
    TimeFrameComponent
  ],
  entryComponents: [
    TimeFrameComponent
  ],
  imports: [
    FormsModule,
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
