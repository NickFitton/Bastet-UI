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
    this.boxOptions = options.split(' ');
  }

  @Output() clicked = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
  }

  elementClicked(option: string): void {
    this.clicked.emit(option.toLowerCase());
  }

}
