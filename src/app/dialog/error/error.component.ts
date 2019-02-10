import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ErrorConfig } from './error.config';

@Component({
  selector: 'app-error-dialog-component',
  templateUrl: './error.component.html',
  styleUrls: []
})
export class ErrorComponent {

  title: string;
  content: string;

  constructor(public dialogRef: MatDialogRef<ErrorComponent>, @Inject(MAT_DIALOG_DATA) public config: ErrorConfig) {
    this.title = config.title;
    this.content = config.content;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
