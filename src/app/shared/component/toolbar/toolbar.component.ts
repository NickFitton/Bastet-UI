import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../api/user/user.service';

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

  settingsHidden: boolean;

  constructor(private router: Router, private userService: UserService) {
    this.toolbarLinks = [
      new Link('Dashboard', '/dashboard', 'home'),
      new Link('My Cameras', '/cameras', 'videocam'),
      new Link('My groups', '/groups', 'group'),
      new Link('Statistics', '/stats', 'bar_chart')
    ];
    this.settingsHidden = true;
  }

  ngOnInit() {
  }

  toggleSettings(): void {
    this.settingsHidden = !this.settingsHidden;
  }

  signOut(): void {
    this.userService.logOut();
    this.router.navigate(['/']);
  }

  goToSettings(): void {
    this.router.navigate(['/settings']);
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