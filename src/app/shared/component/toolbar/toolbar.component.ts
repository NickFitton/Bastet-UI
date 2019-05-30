import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../api/user/user.service';
import { AnimationStatic } from '../../animation.static';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.styl'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({
          opacity: 0
        }),
        animate('0.5s', style({
          opacity: 1
        })),
      ]),
      transition(':leave', [
        style({
          opacity: 1
        }),
        animate('0.5s', style({
          opacity: 0
        })),
      ])
    ]),
    trigger('topIn', [
      transition(':enter', [
        style({
          top: '-100%'
        }),
        animate('1s', style({
          top: '*'
        })),
      ]),
      transition(':leave', [
        style({
          top: '*'
        }),
        animate('1s', style({
          top: '-100%'
        })),
      ])
    ])
  ]
})
export class ToolbarComponent implements OnInit {

  @Input()
  pageName: string;

  @Input()
  firstName: string;

  toolbarLinks: Link[];

  settingsHidden: boolean;

  constructor(public router: Router, public userService: UserService) {
    this.toolbarLinks = [
      new Link('Dashboard', '/dashboard', 'home'),
      new Link('Cameras', '/cameras', 'videocam'),
      new Link('Groups', '/groups', 'group'),
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
