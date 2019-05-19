import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { GroupService } from '../../shared/api/group/group.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.styl']
})
export class CreateGroupComponent implements OnInit {

  step: number;
  groupName: string;
  errorMessage: string;
  showHelp = false;

  constructor(public dialogRef: MatDialogRef<CreateGroupComponent>, public groupService: GroupService) {
    this.groupName = '';
    this.step = 1;
  }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  toggleHelp() {
    this.showHelp = !this.showHelp;
  }

  claimCamera() {
    this.groupService.createGroup(this.groupName).then(
      created => {
        if (created) {
          this.step = 2;
        } else {
          this.errorMessage = 'Failed to create group';
        }
      }
    );
  }

  isClear(s: string) {
    return s === null && s === undefined && s === '';
  }

}
