import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.styl']
})
export class BoxComponent implements OnInit {

  boxOptions: string[];

  @Input()
  link: string;

  @Input()
  set options(options: string) {
    if (options !== undefined) {
      const newoptions = options.split(' ');
      for (const option of newoptions) {
        this.boxOptions.push(option);
      }
    }
  }

  @Output() clicked = new EventEmitter<string>();

  constructor() {
    this.boxOptions = [];
    this.link = '';
  }

  ngOnInit() {
  }

  elementClicked(option?: string): void {
    if (option === undefined) {
      this.clicked.emit('clicked');
    } else {
      this.clicked.emit(option.toLowerCase());
    }
  }

}
