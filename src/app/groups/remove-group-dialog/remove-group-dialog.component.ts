import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GroupInfo } from './group.info';

@Component({
  selector: 'app-remove-group-dialog',
  templateUrl: './remove-group-dialog.component.html',
  styleUrls: ['./remove-group-dialog.component.css']
})
export class RemoveGroupDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<RemoveGroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: GroupInfo) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
