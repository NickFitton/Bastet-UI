import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MotionModel } from '../../shared/api/motion/motion.model';

@Component({
  templateUrl: './present-image.component.html',
  styleUrls: ['./present-image.component.styl']
})
export class PresentImageComponent implements OnInit {

  image: string;

  constructor(@Inject(MAT_DIALOG_DATA) public motion: MotionModel) {
    this.image = motion.getImage();
    motion.getImageEntities();
  }

  ngOnInit() {
  }
}
