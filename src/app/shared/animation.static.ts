import { animate, AnimationTriggerMetadata, style, transition, trigger } from '@angular/animations';

export class AnimationStatic {
  static get fadeGrowIn(): AnimationTriggerMetadata {
    return trigger('fadeGrowIn', [
      transition(':enter', [
        style({
          opacity: 0,
          width: '0px',
          height: '0px'
        }),
        animate('0.5s', style({
          opacity: 1,
          width: '*',
          height: '*'
        })),
      ]),
      transition(':leave', [
        style({
          opacity: 1,
          width: '*',
          height: '*'
        }),
        animate('0.5s', style({
          opacity: 0,
          width: '0px',
          height: '0px'
        })),
      ])
    ]);
  }

  static get fadeIn(): AnimationTriggerMetadata {
    return trigger('fadeIn', [
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
    ]);
  }

  static get fadeInRight(): AnimationTriggerMetadata {
    return trigger('fadeInRight', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(50px)'
        }),
        animate('1s', style({
          opacity: 1,
          transform: 'none'
        })),
      ]),
      transition(':leave', [
        style({
          opacity: 1,
          transform: 'none'
        }),
        animate('1s', style({
          opacity: 0,
          transform: 'translateY(50px)'
        })),
      ])
    ]);
  }
}
