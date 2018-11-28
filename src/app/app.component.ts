import { Component } from '@angular/core';
import { MetadataService } from './shared/api/metadata.service';
import { Observable } from 'rxjs';
import { Metadata } from './shared/api/metadata';
import { MatDialog } from '@angular/material';
import { TimeFrameComponent } from './dialog/timeframe/time-frame.component';
import { TimeFrameModel } from './dialog/timeframe/time-frame.model';
import { TimeFrameDialogModel } from './dialog/timeframe/time-frame-dialog.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {

  public start: TimeFrameModel;
  public end: TimeFrameModel;
  public graphType: string;

  public graphData: Observable<Metadata[]>;

  constructor(private metadataService: MetadataService, private dialog: MatDialog) {
    this.start = new TimeFrameModel(new Date(Date.now() - 5604800000));
    this.end = new TimeFrameModel(new Date());
    this.graphType = 'bar';

    this.queryTimeframe();
  }

  queryTimeframe() {
    this.graphData = this.metadataService.getMetadataCustomRange(this.start.dateTime, this.end.dateTime);
  }

  showTimeFrame() {
    const dialogData = new TimeFrameDialogModel(this.start, this.end, ['Bar', 'Line'], this.graphType);

    const dialogRef = this.dialog.open(TimeFrameComponent, {data: dialogData});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.start = result.start;
        this.end = result.end;
        this.graphType = result.currentGraph;
        this.queryTimeframe();
      }
    });
  }
}
