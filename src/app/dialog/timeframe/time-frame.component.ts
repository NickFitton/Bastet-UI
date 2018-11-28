import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TimeFrameDialogModel } from './time-frame-dialog.model';

@Component({
  selector: 'app-time-frame-dialog-component',
  templateUrl: './time-frame.component.html',
  styleUrls: ['./time-frame.component.styl']
})
export class TimeFrameComponent {
  public data: TimeFrameDialogModel;

  constructor(
    public dialogRef: MatDialogRef<Date[]>,
    @Inject(MAT_DIALOG_DATA) public dialogModel: TimeFrameDialogModel) {
    this.data = dialogModel;
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
