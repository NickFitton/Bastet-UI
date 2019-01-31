import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.styl']
})
export class ToolbarComponent implements OnInit {

  @Input()
  pageName: string;

  @Input()
  firstName: string;

  constructor() { }

  ngOnInit() {
  }

}
