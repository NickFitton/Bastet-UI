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

  toolbarLinks: Link[];

  constructor() {
    this.toolbarLinks = [
      new Link('Dashboard', '/dashboard', 'home'),
      new Link('Cameras', '/cameras', 'videocam'),
      new Link('Statistics', '/stats', 'bar_chart')
    ];
  }

  ngOnInit() {
  }

}

class Link {
  text: string;
  link: string;
  icon: string;

  constructor(text: string, link: string, icon: string) {
    this.text = text;
    this.link = link;
    this.icon = icon;
  }
}
