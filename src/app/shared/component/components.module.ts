import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../../app-routing.module';
import { MaterialModule } from '../material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { BoxComponent } from './box/box.component';
import { StatGraphComponent } from './stat-graph/stat-graph.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  declarations: [
    BarChartComponent,
    BoxComponent,
    StatGraphComponent,
    ToolbarComponent,
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
  ],
  exports: [
    BarChartComponent,
    BoxComponent,
    StatGraphComponent,
    ToolbarComponent,
  ]
})
export class ComponentsModule {
}
