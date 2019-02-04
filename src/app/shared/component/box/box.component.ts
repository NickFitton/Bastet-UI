import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.styl']
})
export class BoxComponent implements OnInit {

  @Input()
  link: string;

  boxOptions: string[];

  @Input()
  set options(options: string) {
    this.boxOptions = options.split(' ');
  }

  constructor() {
  }

  ngOnInit() {
  }

}
